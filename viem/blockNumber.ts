import { http, createPublicClient } from "viem";
import { sepolia as chain } from "viem/chains";

async function main() {
  const client = createPublicClient({
    chain,
    transport: http(),
  });

  const blockNumber = await client.getBlockNumber();
  console.log("Latest block:", blockNumber);
}

main();
