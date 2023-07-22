require('dotenv').config()
const { ethers, Wallet } = require('ethers')

const uniswap = require('@uniswap/sdk')
const sushiswap = require('@sushiswap-core/sdk')

const chainId = uniswap.ChainId.MAINNET
console.log('chainId: ', chainId)

const account = process.env.ACCOUNT
const privateKey = process.env.PRIVATE_KEY
const infuraUrl = process.env.INFURA_URL
const uniswapRouter = process.env.UNISWAP_ROUTER
const sushiswapRouter = process.env.SUSHISWAP_ROUTER
const tokenAddress = process.env.TOKEN_ADDRESS

const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
const signer = new ethers.Wallet(privateKey)

const bot = async () => {

    const comparePrice = ethers.utils.parseEther("1")

    const token = await uniswap.Fetcher.fetchTokenData(
        chainId,
        tokenAddress,
        provider
    )

    // SUSHISWAP EXCHANGE

    const sushiWETH = sushiswap.WETH[chainId]
    const sushiPair = await sushiswap.Fetcher.fetchPairData(token, sushiWETH, provider)
    const sushiRoute = new sushiswap.Route([sushiPair], sushiWETH)
    const sushiTrade = new sushiswap.Trade(
        sushiRoute,
        new sushiswap.TokenAmount(sushiWETH, comparePrice),
        sushiswap.TradeType.EXACT_INPUT
    )
    const sushiTokenPrice = sushiTrade.outputAmount.raw
    const sushiTP = ethers.utils.formatUnits(sushiTokenPrice.toString(), 6)

    console.log('Number of tokens receive on Sushiswap for 1 ETH: ', `${sushiTP} USDT`)


    // UNISWAP EXCHANGE]

    const uniWETH = uniswap.WETH[chainId]
    const uniPair = await uniswap.Fetcher.fetchPairData(token, uniWETH, provider)
    const uniRoute = new uniswap.Route([uniPair], uniWETH)
    const uniTrade = new uniswap.Trade(
        uniRoute,
        new uniswap.TokenAmount(uniWETH, comparePrice),
        uniswap.TradeType.EXACT_INPUT
    )
    const uniTokenPrice = uniTrade.outputAmount.raw
    const uniTP = ethers.utils.formatUnits(uniTokenPrice.toString(), 6)

    console.log('Number of tokens receive on Uniswap for 1 ETH: ', `${uniTP} USDT`)

    

    // TRADE

    if (uniTP > sushiTP) {
        console.log('Buy on Sushiswap and Sell on Uniswap')
    } else if (uniTP < sushiTP) {
        console.log('Buy on Uniswap and Sell on Sushiswap')
    } else {
        console.log('No profit')
    }

    // PROFIT IN ETH

    console.log('Estimated Profit : ', `${uniTP-sushiTP} USDT\n\n\n`)

}

bot()

