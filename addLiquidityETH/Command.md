- Token create, compile and deploy
- Add liquidity

- npx solc --version
- Contract compile = npx solc --bin --abi Token.sol -o build
- npm init -y
- npm install
- Contract deploy = node deploy.js
- Contract address = 0x1a62C4c8D94c5D47B61917E92fE101D698Fc1Cd1
- Add Liquidity = node addLiquidity.js


Problems solution

- ethers.utils.parseUnits("1000000000", 18); (wrong)
- ethers.parseUnits("1000000000", 18); ( right)

- You're calling .mul() on a BigInt, but in Ethers v6, parseUnits() returns a BigInt, not a BigNumber like in v5.
- tokenAmount.mul(95).div(100) (wrong)
- (tokenAmount * 95n) / 100n; (right)


- it's missing the transferFrom() function
