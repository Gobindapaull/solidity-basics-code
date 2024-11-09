const ethers = require("ethers");
const axios = require("axios");

const Counter = require("./Counter.json");

async function verifyContract(contractAddress, contractSourceCode, contractName, constructorArgs) {
    // Replace this with your actual Etherscan API key
    const apiKey = "";
    const network = "testnet"; // Change to 'mainnet' or other networks as needed

    // Etherscan API URL for Goerli testnet
    // https://api-testnet.bscscan.com/api
    const etherscanApiUrl = `https://api-${network}.bscscan.io/api`;

    const params = {
        apikey: apiKey,
        module: "contract",
        action: "verifysourcecode",
        contractaddress: contractAddress,
        sourceCode: contractSourceCode,
        codeformat: "solidity-single-file",
        contractname: contractName,
        compilerversion: "v0.8.26+commit.8a97fa7a", // 
        constructorArguements: constructorArgs || "", // If any
    };

    try {
        const response = await axios.post(etherscanApiUrl, null, { params });
        console.log("Verification response:", response.data);
    } catch (error) {
        console.error("Error during contract verification:", error);
    }
}

async function deploy() {
    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel");
    const wallet = new ethers.Wallet("", provider);

    const factory = new ethers.ContractFactory(Counter.abi, Counter.data.bytecode, wallet);
    const counter = await factory.deploy(123);

    const contractDeploy = await counter.waitForDeployment();
    const contractAddress = await contractDeploy.getAddress();
    console.log(`deployed contract address : ${contractAddress}`); // 0xbAa4c3b6eE46119B455cB2496e9cecdbF2D11E40

    const sourceCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    // Constructor to initialize the count
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }

    // Function to increment the counter
    function increment() public {
        count += 1;
    }

    // Function to decrement the counter
    function decrement() public {
        require(count > 0, "Counter cannot go below zero");
        count -= 1;
    }

    // Function to get the current count
    function getCount() public view returns (uint256) {
        return count;
    }
}
`

    await verifyContract(contractAddress, sourceCode, "Counter", "0000000000000000000000000000000000000000000000000000000000000123");

    const count = await contractDeploy.getCount();
    console.log(`Initial count : ${count}`);

    const increment = await contractDeploy.increment();
    await increment.wait();
    const incrementCount = await contractDeploy.getCount();
    console.log(`new count : ${incrementCount}`);

}

deploy();
