// "dotenv": "^16.0.3",
// "ethers": "^6.3.0"

const { ethers, Contract } = require('ethers')
require('dotenv').config()

const privateKey = process.env.PRIV_KEY
const url = process.env.URL

const provider = new ethers.JsonRpcProvider(url)
console.log('provider: ', provider)

const wallet = new ethers.Wallet(privateKey, provider)
const receiver = "0x4f86656f6275C3607A6d205B672387F57022E8cD"
const sender = "0xb65AcC8d7489b1Be09Ba629045e21cBFeD06c2eE"
const amountETHSend = '0.00001'
const amountTokenSend = '5'

const tx = {
    to: receiver,
    value: ethers.parseEther(amountETHSend)
}

const tokenAddress = "0x7E18Ec727F5599b9Cb3ff1e220C5a48fe15F88A3"
const tokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"LinkToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

const contract = new Contract(tokenAddress, tokenAbi, wallet)

// transfer ETH
async function transferETH() {
    const bal = await provider.getBalance(sender)
    const balance = ethers.formatEther(bal)
    console.log('ETH balance: ', balance)

    wallet.sendTransaction(tx).then((txObject) => {
        console.log('txObject: ', txObject)
    })
    // https://goerli.etherscan.io/tx/0x3d08348becfb7d166723ed6d575f3103f42064bbdf111d7e38ffbf027d271de8
}

// transfer ERC20 tokens
async function transferERC20() {
    const decimals = await contract.decimals()
    const bal = await contract.balanceOf(sender)
    const balance = ethers.formatUnits(bal, decimals)
    console.log('sender balance: ', balance)

    contract.transfer(receiver, ethers.parseEther(amountTokenSend, decimals)).then((tx) => {
        console.log('tx: ', tx)
    })
    // https://goerli.etherscan.io/tx/0x9e9131834b4c6eefa777325257fc487d7f9dc7c944b86bf4853085e83d692748
}

run_info()

transferERC20()


