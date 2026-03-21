require("dotenv").config();
const API_KEY = process.env.ETHERSCAN_API_KEY!;

async function getETHBalance(address: string): Promise<number> {
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log("FULL RESPONSE:", data);

  if (!data || data.status !== "1") {
    console.log("❌ API ERROR:", data);
    return 0;
  }

  return Number(data.result) / 1e18;
}

async function main() {
  const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  const balance = await getETHBalance(address);

  console.log("✅ ETH Balance:", balance);
}

main();
