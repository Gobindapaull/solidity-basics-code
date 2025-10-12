const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_BSC);

const main = async () => {
    const chainId = (await provider.getNetwork()).chainId;
    console.log(`chain id : ${chainId}`); // chain id : 56
}

main();
