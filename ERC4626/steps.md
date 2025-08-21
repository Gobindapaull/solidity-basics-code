1) deploy ERC20 contract

0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 = 10 million tokens (deployer)
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 = 100 tokens (user)

2) deploy Vault contract

3) ERC20 contract > approve(vaultContract, 100000000000000000000)

4) ERC20 contract > allowance(usersAddress, vaultContract)

5) Vault Contract > deposit(amount, receiverAddress)

6) ERC20 contract > balanceOf(receiver) 

7) Vault contract > totalAssets(), totalSupply()

8) Vault contract > redeem(amount, receiver, owner)
