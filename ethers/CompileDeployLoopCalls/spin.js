const ethers = require("ethers");

const ABI = require("./build/BlockTimestamp.json");
const tokenAddress = "0xdb54E58414Cc9C20c069934e1DFB4957221Fe998";

const provider = new ethers.JsonRpcProvider("https://bsc-testnet-dataseed.bnbchain.org");
const wallet = new ethers.Wallet("", provider);

const tokenContract = new ethers.Contract(tokenAddress, ABI, wallet);

async function callSpin() {
  try {
    const tx = await tokenContract.spin({ 
        value: ethers.parseEther("0.0001"),
        gasLimit: 100000
    });
    console.log("Spin tx sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Tx confirmed:", receipt.hash);
  } catch (err) {
    console.error("Spin failed:", err.message);
  }
}


// Call spin in an interval loop
async function startLoop() {
  while (true) {
    await callSpin();
    await new Promise(res => setTimeout(res, 3000)); // Wait 3 seconds
  }
}

startLoop();

// https://testnet.bscscan.com/tx/0x48093e588d42baad24c5181f7b4234c5f832d911229c9b5e1ff82e0aa2e37c37
