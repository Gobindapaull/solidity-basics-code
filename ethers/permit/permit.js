const { Wallet, ethers, TypedDataEncoder } = require("ethers");



// SETUP
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com');
const wallet = new Wallet('0xb0f6de02fb4d6e2ee6e616a18e5aa2325c92ebe180edfa2391ff9f83c088d1c7', provider);

console.log(`wallet address: ${wallet.address}`);

// Permit input
const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Token with permit (e.g., USDC)
const spender = wallet.address;      // Who will spend tokens
const value = ethers.parseUnits('1', 18); // Allowance amount
const deadline = Math.floor(Date.now() / 1000) + 1000; // 1 hour from now

// 1. ABI of permit() function
const ABI = require("./ABI.json");

const token = new ethers.Contract(tokenAddress, ABI, wallet);

const main = async () => {
    // 2. Get nonce and domain
    const nonce = await token.nonces(wallet.address);
    console.log(`Nonce : ${nonce}`);
    const chainId = (await provider.getNetwork()).chainId;
    console.log(`Chain ID: ${chainId}`);
    // Optional: If `DOMAIN_SEPARATOR()` is available, you can fetch it:
    const domainSeparator = await token.DOMAIN_SEPARATOR();
    console.log(`Domain separator: ${domainSeparator}`);

    // 3. EIP-712 Domain
    const domain = {
        name: 'USD Coin', // Replace with actual token name
        version: '2',      // Usually '1', check the token code/docs
        chainId,
        verifyingContract: tokenAddress
    };

    // 4. Types and message for signing
    const types = {
        Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
        ]
    };

    const message = {
        owner: wallet.address,
        spender,
        value,
        nonce,
        deadline
    };

    // 5. Sign the permit data
    const signature = await wallet.signTypedData(domain, types, message);
    const { v, r, s } = ethers.Signature.from(signature);
    console.table([v, r, s]);

    // 6. Call permit() on-chain
    const tx = await token.permit(wallet.address, spender, value, deadline, v, r, s);
    console.log('Permit transaction hash:', tx.hash);
    await tx.wait();
    console.log('Permit confirmed!');
}

main();
