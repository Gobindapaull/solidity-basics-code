
require('dotenv').config();
const { TronWeb } = require('tronweb');

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_NETWORK,
    privateKey: process.env.PRIVATE_KEY
});

const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const NEW_OWNER = process.env.NEW_OWNER;

const THRESHOLD = 2;

function toBase58(address) {
    if (address.startsWith('T')) return address;
    return tronWeb.address.fromHex(address);
}

async function updateOwnerPermissions() {
    try {
        // 1. Validate configuration
        if (!PRIVATE_KEY) {
            throw new Error('PRIVATE_KEY is missing');
        }

        if (!tronWeb.isAddress(OWNER_ADDRESS)) {
            throw new Error('Invalid owner account address');
        }

        if (!tronWeb.isAddress(NEW_OWNER)) {
            throw new Error('Invalid new owner address');
        }

        const currentAddress = toBase58(OWNER_ADDRESS);
        const newOwnerAddress = toBase58(NEW_OWNER);

        if (currentAddress === newOwnerAddress) {
            throw new Error('New owner cannot be the current account');
        }

        // 2. Get current account permissions
        const account = await tronWeb.trx.getAccount(OWNER_ADDRESS);

        if (!account.owner_permission || !account.active_permission) {
            throw new Error('Could not retrieve account permissions');
        }

        // 3. Define new authorized owners
        const newOwnerKeys = [
            {
                address: currentAddress,
                weight: 1
            },
            {
                address: newOwnerAddress,
                weight: 1
            }
        ];

        // 4. Build new owner permission
        const ownerPermission = {
            type: 0,
            permission_name: 'owner',
            threshold: THRESHOLD,
            keys: newOwnerKeys
        };

        // 5. Build active permissions
        // Preserve existing operations
        const activePermissions = account.active_permission.map(
            (permission, index) => ({
                type: 2,
                permission_name:
                    permission.permission_name || `active${index}`,
                threshold: THRESHOLD,
                operations: permission.operations,
                keys: newOwnerKeys
            })
        );

        if (activePermissions.length === 0) {
            throw new Error('No active permission found');
        }

        // 6. Check current signing authority
        const signerAddress =
            tronWeb.address.fromPrivateKey(PRIVATE_KEY);

        const currentOwnerWeight = account.owner_permission.keys
            .filter(key =>
                toBase58(key.address) === signerAddress
            )
            .reduce((total, key) => total + key.weight, 0);

        if (
            currentOwnerWeight <
            account.owner_permission.threshold
        ) {
            throw new Error(
                'Current private key cannot satisfy existing owner threshold. Additional signatures are required.'
            );
        }

        // 7. Display configuration
        console.log('\n========== NEW PERMISSIONS ==========');

        console.log('\nOwner Permission:');
        console.log('Threshold:', THRESHOLD);
        console.log('Authorized Owners:', newOwnerKeys);

        console.log('\nActive Permissions:');

        activePermissions.forEach((permission, index) => {
            console.log(`Active ${index}:`);
            console.log('Threshold:', permission.threshold);
            console.log('Authorized Owners:', permission.keys);
        });

        // 8. Create permission update transaction
        const transaction =
            await tronWeb.transactionBuilder.updateAccountPermissions(
                OWNER_ADDRESS,
                ownerPermission,
                null,
                activePermissions
            );

        console.log('\nTransaction created:', transaction.txID);

        // 9. Sign transaction using existing owner authority
        const signedTransaction = await tronWeb.trx.sign(
            transaction,
            PRIVATE_KEY
        );

        console.log('Transaction signed successfully');

        // 10. Broadcast transaction
        const result = await tronWeb.trx.sendRawTransaction(
            signedTransaction
        );

        if (!result.result) {
            const message = result.message
                ? Buffer.from(result.message, 'hex').toString()
                : 'Transaction broadcast failed';

            throw new Error(message);
        }

        console.log('\n========== TRANSACTION RESULT ==========');
        console.log('Broadcast successful');
        console.log('Transaction ID:', result.txid || transaction.txID);

        // 11. Verify after confirmation
        console.log(
            'Check transaction confirmation before verifying updated permissions.'
        );

    } catch (error) {
        console.error('\nError:', error.message || error);
    }
}

updateOwnerPermissions();

// Update Owner & Active Permissions

