// ETH = $4000
// USDT = $1
// price = 4000

// const sqrtPriceX96 = BigInt(Math.sqrt(4000) * 2 ** 96);
// console.log(sqrtPriceX96.toString());

// For production use
const price = 4000n;
const Q96 = 2n ** 96n;
const sqrtPriceX96 =BigInt(Math.sqrt(Number(price)) * Number(Q96));
console.log(sqrtPriceX96.toString());
