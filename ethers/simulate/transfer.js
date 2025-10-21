const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

const token = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const wallet = "0x307576Dd4F73f91BB8c4A2EdB762938E8e067d31";
const recipient = "0x6928F3e126dBac9923d52300fdeF714B280b305C"
const amount = 100n * 10n ** 6n;

const iface = new ethers.Interface([
    "function transfer(address to, uint256 value) public returns (bool)"
]);

const data = iface.encodeFunctionData("transfer", [recipient, amount]);

const main = async () => {
    // simulate transfer()
    try {
        const rawResult = await provider.call({
            to: token,
            from: wallet,
            data: data
        });
        const decoded = iface.decodeFunctionResult("transfer", rawResult);
        console.log(`✅ Simulation successful: ${decoded}`);
    } catch (error) {
        console.log(error);
    }

}

main();
