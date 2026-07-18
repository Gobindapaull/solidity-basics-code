
# Foundry

## Install Foundry
- curl -L https://getfoundry.sh/install | bash

## Update Foundry
- foundryup
- foundryup --version

## Forge
- forge --version
- which forge
- forge init
- forge build
- forge test

## Query blockchain data
- cast balance vitalik.eth --ether --rpc-url https://eth.blockrazor.xyz
- cast block-number --rpc-url https://eth.blockrazor.xyz
- cast call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 "totalSupply()" --rpc-url https://eth.blockrazor.xyz
- cast --to-dec 0x000000000000000000000000000000000000000000020261bc4cdf86c33539b4
- cast --from-wei 2429099274835694720465332 ether


## Send ether
- cast send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 \
    --value 1ether \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
