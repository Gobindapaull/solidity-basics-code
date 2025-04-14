const ethers  = require("ethers");
const fs = require("fs")
require("dotenv").config();

// BSC Testnet setup
const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Replace with your deployed token contract address
const tokenAddress = process.env.TOKEN_ADDRESS; // Your token address
const tokenABI = JSON.parse(fs.readFileSync('./build/Token_sol_Token.abi', 'utf8')); // Token contract ABI

// Function to generate random Ethereum addresses
const generateRandomAddresses = (numAddresses) => {
  let addresses = [];
  for (let i = 0; i < numAddresses; i++) {
    const newWallet = ethers.Wallet.createRandom();
    addresses.push(newWallet.address);
  }
  return addresses;
};

// Function to generate an array of random numbers between 0 and 100
const generateRandomNumbers = (numNumbers) => {
  let numbers = [];
  for (let i = 0; i < numNumbers; i++) {
    const randomNumber = Math.floor(Math.random() * 101); // Random number between 0 and 100
    numbers.push(randomNumber);
  }
  return numbers;
};

// Generate 50 random addresses and 50 random amounts
const recipients = generateRandomAddresses(50);
const amounts = generateRandomNumbers(50);


async function airdrop() {
  const token = new ethers.Contract(tokenAddress, tokenABI, wallet);

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    const amount = amounts[i];

    // Ensure the recipient address is valid
    if (!ethers.isAddress(recipient)) {
      console.log(`Invalid address: ${recipient}`);
      continue;
    }

    try {
      // Send tokens to the recipient
      const tx = await token.transfer(recipient, amount);
      const receipt = await tx.wait();
      console.log(`Airdropped ${ethers.formatUnits(amount, 18)} tokens to ${recipient}. TX Hash: ${receipt.hash}`);
    } catch (error) {
      console.error(`Failed to airdrop to ${recipient}: ${error.message}`);
    }
  }

  console.log("Airdrop complete!");
}

airdrop()
