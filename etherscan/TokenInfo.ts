require("dotenv").config();
const API_KEY = process.env.ETHERSCAN_API_KEY!;

interface Token {
    name: string;
    symbol: string;
    decimals: number;
    contractAddress: string;
}

async function getTokenBalance(address: string): Promise<Token[]> {
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokentx&address=${address}&page=1&offset=200&sort=desc&apikey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data || data.status !== "1") {
    console.log("❌ API ERROR:", data);
    return [];
  }

  const tokens: Token[] = data.result.map((tx: any) => ({
    name: tx.tokenName,
    symbol: tx.tokenSymbol,
    decimals: tx.tokenDecimal,
    contractAddress: tx.contractAddress
  }));

  return tokens;
}

function removeDuplicates(tokens: Token[]): Token[] {
  const map = new Map<string, Token>();

  for (const token of tokens) {
    map.set(token.contractAddress, token);
  }

  return Array.from(map.values());
}

async function main() {
  const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  const tokenRaw = await getTokenBalance(address);
  const tokens =  removeDuplicates(tokenRaw);

  console.log("✅ Token INFO:", tokens);
}

main();
