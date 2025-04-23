require("dotenv").config();
const ethers  = require("ethers");


const bytes32Data = async () => {
    const message1 = ethers.encodeBytes32String(process.env.MESSAGE.slice(0, 31));
    // bytes32 string must be less than 32 bytes
    console.log(message1) 


};

bytes32Data()
