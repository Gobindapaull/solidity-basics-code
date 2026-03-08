- 10,000 People, Looking for those arbitrage opportunities
- 1 / 10,000 can grab this opportunity
- Server, Internet speed, hardware that matters
- Private node > Public node
- Public node = It has a limit on the number of network access
- Private node = It don't have any restriction
- Pool address = LP address copy from [dexscreener.com](https://dexscreener.com/ethereum)
- Check the Swap event
- Calculate slippage function = calculateSlippage( )
- Monitor the swap event = monitorSwaps( )
- If slippage is > 1 then script just output the relevant data


- WebSocket provider = Alchemy or QuickNode


    // sniper-bot protection from block one
    // anti-whale mechanics in the transfer logic
    
    // --------------- MEV sniping attack sequence---------------

    // Block N: Your AddLiquidity transaction is broadcast to the mempool
    // ↓
    // Block N: A bot's RPC node sees it before it's confirmed
    // ↓
    // Block N+1: Bot front-runs with a massive buy at near-zero price
    // (using high gas to jump the queue)
    // ↓
    // Block N+2: Real retail buyers start purchasing — price rises
    // ↓
    // Block N+3: Bot dumps its entire position into those buyers
