const { parseEther, parseUnits, MaxUint256, getBalance } = require("ethers");
const { ethers } = require("hardhat");

const ERC20ABI = require('../ERC20.json');


const UNISWAPV2ROUTER02_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

const main = async () => {
  const [owner, user1, user2] = await ethers.getSigners()
  console.log(`owner address ${owner.address}`)

  const ethBalance = await ethers.provider.getBalance(owner.address)
  console.log("eth balance : ", ethers.formatEther(ethBalance))


  const uniswapExample = await ethers.getContractFactory("UniswapTradeExample")
  const uniswapInstance = await uniswapExample.deploy(UNISWAPV2ROUTER02_ADDRESS)
  await uniswapInstance.waitForDeployment()

  console.log("---------- do swap ----------")


};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
