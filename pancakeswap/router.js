const ethers = require('ethers')
require('dotenv').config()

const bsc = process.env.BSC_NODE;
const mnemonic = process.env.YOUR_MNEMONIC;
const provider = new ethers.JsonRpcProvider(bsc);
const wallet = ethers.Wallet.fromPhrase(mnemonic);
const account = wallet.connect(provider);
const pancakeswapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const router = new ethers.Contract(
    pancakeswapRouterAddress,
    [
      "function WETH() external pure returns (address)",
      "function factory() external pure returns (address)",
      "function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut)",
      "function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) public pure returns (uint amountIn)",
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
      "function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)",
      "function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB)",
      "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
      "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    ],
    account
  );

console.log(router)
