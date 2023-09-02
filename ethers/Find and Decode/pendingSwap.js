const ethers = require("ethers")
require("dotenv").config()

const provider = new ethers.WebSocketProvider(process.env.WEBSOCKET_URL)
// console.log(provider)

const {
  abi,
} = require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json")
// console.log(abi)

const contractInterface = new ethers.Interface(abi)
// console.log(contractInterface)

const main = async () => {
  provider.on("pending", async (hash) => {
    getTransaction(hash)
  })
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const UNISWAP_ADDRESSES = [
  "0xE592427A0AEce92De3Edee1F18E0157C05861564", // swap router
];

let txIdx = 0;
const getTransaction = async (transactionHash) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const tx = await provider.getTransaction(transactionHash);
    if (tx) {
      if (UNISWAP_ADDRESSES.includes(tx.to)) {
        txIdx += 1
        const data = tx.data
        decodeTransaction(data, txIdx)
        break
      }
    }
    await delay(1000)
  }
};

const decodeTransaction = (txInput, txIdx, isMulticall = false) => {
    const decodedData = contractInterface.parseTransaction({ data: txInput })

    const functionName = decodedData.name

    const args = decodedData.args
    const params = args.params
    const data = args.data

    logFunctionName(functionName, txIdx, isMulticall)


    if (functionName === 'exactInputSingle') { return logExactInputSingle(params) }

    if (functionName === 'exactOutputSingle') { return logExactOutputSingle(params) }

    if (functionName === 'exactInput') { return logExactInput(params) }

    if (functionName === 'exactOutput') { return logExactOutput(params) }

    if (functionName === 'selfPermit') { return logSelfPermit(args) }

    if (functionName === 'refundETH') { return logRefundETH(args) }

    if (functionName === 'unwrapWETH9') { return logUnwrapWETH9(args) }

    if (functionName === 'multicall') { return parseMulticall(data, txIdx) }

    console.log('ADD THIS FUNCTION:', functionName)
    console.log('decodedData:', decodedData)
}

const logFunctionName = (functionName, txIdx, isMulticall) => {
    if (isMulticall) {
        console.log()
        console.log('-------', `Fn: ${txIdx}`, functionName);
        return
    }

    console.log()
    console.log('======================================================================================')
    console.log('==============================', `Tx: ${txIdx} - ${functionName}`, '==============================')
    console.log('======================================================================================')
}

const parseMulticall = (data, txIdx) => {
    data.forEach((tx, fnIdx) => {
        decodeTransaction(tx, fnIdx, true)
    })
}

const logUnwrapWETH9 = (args) => {
    console.log('amountMinimum:    ', args.amountMinimum)
    console.log('recipient:        ', args.recipient)
}

const logExactInputSingle = (params) => {
    console.log('tokenIn:          ', params.tokenIn)
    console.log('tokenOut:         ', params.tokenOut)
    console.log('fee:              ', params.fee)
    console.log('recipient:        ', params.recipient)
    console.log('deadline:         ', params.deadline)
    console.log('amountIn:         ', params.amountIn)
    console.log('amountOutMinimum: ', params.amountOutMinimum)
    console.log('sqrtPriceLimitX96:', params.sqrtPriceLimitX96)
}

const logExactOutputSingle = (params) => {
    console.log('tokenIn:          ', params.tokenIn)
    console.log('tokenOut:         ', params.tokenOut)
    console.log('fee:              ', params.fee)
    console.log('recipient:        ', params.recipient)
    console.log('deadline:         ', params.deadline)
    console.log('amountOut:        ', params.amountOut)
    console.log('amountInMaximum:  ', params.amountInMaximum)
    console.log('sqrtPriceLimitX96:', params.sqrtPriceLimitX96)
}

const logExactInput = (params) => {
    console.log('path:             ', params.path)
    console.log('recipient:        ', params.recipient)
    console.log('deadline:         ', params.deadline)
    console.log('amountIn:         ', params.amountIn)
    console.log('amountOutMinimum: ', params.amountOutMinimum)
}

const logExactOutput = (params) => {
    console.log('path:             ', params.path)
    console.log('recipient:        ', params.recipient)
    console.log('deadline:         ', params.deadline)
    console.log('amountOut:        ', params.amountOut)
    console.log('amountInMaximum:  ', params.amountInMaximum)
}

const logSelfPermit = (params) => {
    console.log('token:            ', params.token)
    console.log('value:            ', params.value)
    console.log('deadline:         ', params.deadline)
}

const logRefundETH = (params) => {
    console.log('Nothing to log')
}

main()
