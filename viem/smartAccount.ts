import { http, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey();

import {
  toMetaMaskSmartAccount,
  Implementation,
} from "@metamask/smart-accounts-kit";

async function main() {
  // 1. Public client
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  // 2. EOA signer
  const account = privateKeyToAccount(privateKey);
  console.log(`wallet address: ${account.address}`);

  // 3. Create MetaMask Smart Account
  const smartAccount = await toMetaMaskSmartAccount({
    client: publicClient,
    implementation: Implementation.Hybrid,
    deployParams: [account.address, [], [], []],
    deploySalt: "0x",
    signer: { account },
  });

  console.log("Smart Account address:", smartAccount.address);
}

main().catch(console.error);
