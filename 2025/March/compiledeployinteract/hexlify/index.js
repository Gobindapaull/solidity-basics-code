require("dotenv").config();
const ethers  = require("ethers");


const bytes32Data = async () => {
    const len = "0x53656e64206d65737361676520746f2074686520626c6f636b636861696e2000";
    console.log(len.length); // 66
    const message1 = ethers.toUtf8Bytes(process.env.MESSAGE);
    // 0x53656e64206d65737361676520746f2074686520626c6f636b636861696e2074686520626c6f636b636861696e2e204974206973206d6f7265207468616e203332206279746573
    const hexMessage = ethers.hexlify(message1).slice(0, 65);
    // bytes32 string must be less than 32 bytes
    console.log(hexMessage) 


};

bytes32Data()
