require('dotenv').config()
const apiKey = process.env.API_KEY
const ethers = require('ethers')

const main = async () => {
    const url = await fetch(`https://api.bscscan.com/api?module=stats&action=bnbsupply&apikey=${apiKey}`)
    const res = await url.json()
    console.log(`Total BNB : ${ethers.formatEther(res.result)} BNB`)
    // 24 million bnb
}

main()
