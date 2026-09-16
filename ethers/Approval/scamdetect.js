const ethers = require("ethers")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

const testAddress = process.env.TEST_TOKEN

const fromBlock = Number(process.env.FROM_BLOCK)
const toBlock = Number(process.env.TO_BLOCK)

const approvalTopic = ethers.id(
    "Approval(address,address,uint256)"
)

const iface = new ethers.Interface([
    "event Approval(address indexed owner, address indexed spender, uint256 value)"
])

async function isContract(address) {
    const code = await provider.getCode(address)
    return code !== "0x"
}

async function getEventTxn(event) {
    const txn = await provider.getTransactionReceipt(
        event.transactionHash
    )

    if (!txn) {
        throw new Error(
            `Transaction receipt not found: ${event.transactionHash}`
        )
    }

    return txn
}

async function getApprovalLogs(fromBlock, toBlock) {
    const chunkSize = 10000
    const allLogs = []

    for (
        let start = fromBlock;
        start <= toBlock;
        start += chunkSize
    ) {
        const end = Math.min(
            start + chunkSize - 1,
            toBlock
        )

        console.log(
            `Scanning blocks ${start} -> ${end}`
        )

        const logs = await provider.getLogs({
            address: testAddress,
            topics: [approvalTopic],
            fromBlock: start,
            toBlock: end
        })

        allLogs.push(...logs)
    }

    return allLogs
}

async function suspiciousApprovalEvent(event) {
    const owner = event.owner

    if (await isContract(owner)) {
        return {
            ...event,
            suspicious: false,
            reasons: ["Owner is a contract"]
        }
    }

    const txn = await getEventTxn(event)

    const reasons = []

    if (
        owner.toLowerCase() !==
        txn.from.toLowerCase()
    ) {
        reasons.push(
            "Approval owner != transaction sender"
        )
    }

    if (
        txn.to &&
        txn.to.toLowerCase() !==
        testAddress.toLowerCase()
    ) {
        reasons.push(
            "Transaction destination != token contract"
        )
    }

    if (event.value === ethers.MaxUint256) {
        reasons.push("Unlimited approval")
    }

    return {
        ...event,
        txFrom: txn.from,
        txTo: txn.to,
        suspicious: reasons.length > 0,
        reasons
    }
}

async function main() {
    try {
        console.log("Token:", testAddress)
        console.log(
            `Block range: ${fromBlock} -> ${toBlock}`
        )

        const logs = await getApprovalLogs(
            fromBlock,
            toBlock
        )

        console.log(
            `\nFound ${logs.length} Approval events`
        )

        const approvalEvents = logs
            .map((log) => {
                const parsed = iface.parseLog(log)

                if (!parsed) {
                    return null
                }

                return {
                    transactionHash: log.transactionHash,
                    blockNumber: log.blockNumber,
                    owner: parsed.args.owner,
                    spender: parsed.args.spender,
                    value: parsed.args.value
                }
            })
            .filter(Boolean)

        const results = await Promise.all(
            approvalEvents.map(
                (event) => suspiciousApprovalEvent(event)
            )
        )

        const suspicious = results.filter(
            (event) => event.suspicious
        )

        console.log(
            `\nSuspicious approvals: ${suspicious.length}`
        )

        for (const event of suspicious) {
            console.log("\n------------------------------")

            console.log(
                "Transaction:",
                event.transactionHash
            )

            console.log(
                "Block:",
                event.blockNumber
            )

            console.log(
                "Owner:",
                event.owner
            )

            console.log(
                "Spender:",
                event.spender
            )

            console.log(
                "Value:",
                event.value.toString()
            )

            console.log(
                "TX From:",
                event.txFrom
            )

            console.log(
                "TX To:",
                event.txTo
            )

            console.log(
                "Reasons:",
                event.reasons.join(", ")
            )
        }

    } catch (error) {
        console.error("\nError:", error)
    }
}

main()


// Scam approval check script
// telegram: @autoboyt
