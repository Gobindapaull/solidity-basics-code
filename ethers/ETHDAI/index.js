const ethers = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");
const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const iface = new ethers.Interface([
    "function getAmountsOut(uint256, address[]) view returns (uint256[])"
]);
const amountIn = ethers.parseEther("2");
const path = [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
  "0x6B175474E89094C44Da98b954EedeAC495271d0F"  // DAI
];
const data = iface.encodeFunctionData("getAmountsOut", [amountIn, path]);

const main = async () => {
    const rawResult = await provider.call({
        to: routerAddress,
        data: data
    });
    const decoded = iface.decodeFunctionResult("getAmountsOut", rawResult);
    console.log(`1 ETH  = ${ethers.formatEther(decoded[0][1])} DAI`); // 1 ETH  = 7870.749479732496574295 DAI
}

main();
