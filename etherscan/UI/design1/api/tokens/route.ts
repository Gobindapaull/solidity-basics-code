import { NextResponse } from "next/server";

const API_KEY = process.env.ETHERSCAN_API_KEY!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "No address" }, { status: 400 });
  }

  try {
    const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokentx&address=${address}&page=1&offset=200&sort=desc&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.status !== "1") {
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    const map = new Map();

    for (const tx of data.result) {
      map.set(tx.contractAddress, {
        name: tx.tokenName,
        symbol: tx.tokenSymbol,
        decimals: Number(tx.tokenDecimal),
        contractAddress: tx.contractAddress,
      });
    }

    const tokens = Array.from(map.values());

    return NextResponse.json({ tokens });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
