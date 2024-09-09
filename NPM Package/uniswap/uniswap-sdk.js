import { Percent } from "@uniswap/sdk";

const SLIPPAGE = new Percent("50", "10000");
const deadline = Math.floor(Date.now() / 1000);

console.log(`The current Unix epoch time is: ${deadline}`);
console.log(`SLIPPAGE: ${SLIPPAGE.toSignificant()}`);
