import { ethers } from "hardhat";

async function main() {
    try {
       const provider = ethers.provider;
       const signer = (await ethers.getSigners())[0]; 
       const verifier = await ethers.getContractAt("EIP712Verifier", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

       const domain = {
        name: "EIP 712 example",
        version: "1",
        chainId: (await provider.getNetwork()).chainId,
        verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
       }

       const types = {
        SimpleStruct: [ {name: "message", type: "string"}, {name: "value", type: "uint256"}]
       }

       const request = {
        message: "Hello, EIP 712 Contract",
        value: 90
       }

       const signature = await signer.signTypedData(domain, types, request);

       const result = await verifier.verify(
        signer.address,
        request,
        signature
       );

       console.log(result); // true

    } catch (error) {
        console.log(error);
    }
}

main();
