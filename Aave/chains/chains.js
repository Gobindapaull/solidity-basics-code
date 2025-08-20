import { AaveClient } from "@aave/client";
import { chains } from "@aave/client/actions";

const client = AaveClient.create();

async function main() {
    const chainsSupported = await chains(client);

    if (chainsSupported.isOk()) {
        console.log(`Chains: ${JSON.stringify(chainsSupported.value, null, 2)}`);
        console.log(`Total chains: ${JSON.stringify(chainsSupported.value.length, null, 2)}`);
    } else {
        console.log(`Error: ${chainsSupported.error}`);
    }
}

main();
