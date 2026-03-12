const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");
const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

const main = async () => {
    const slot0 = await provider.getStorage(usdt, 0);
    const slot1 = await provider.getStorage(usdt, 1);

    console.log(`slot 0 : ${slot0}`); // owner - c6cde7c39eb2f0f0095f41570af89efc2c1ea828
    console.log(`slot 1 : ${slot1}`); // totalSupply - 96117776799046035
    
}

main();

// Read ANY Smart Contract Storage in 10 Lines (EVM Secret)

// RPC URL = "https://eth.llamarpc.com"
// USDT address = 0xdAC17F958D2ee523a2206206994597C13D831ec7
