const ethers = require("ethers");

const abi = require("../abi/tokenABI.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

const token = new ethers.Contract(contractAddress, abi, wallet);

// Read token info
const getTokenInfo = async (req, res) => {
    try {
        const name = await token.name();
        const symbol = await token.symbol();
        const supply = await token.totalSupply();

        return res.json({
            success: true,
            data: {
                name,
                symbol,
                totalSupply: ethers.formatEther(supply)
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Transfer tokens
const transferToken = async (req, res) => {
    try {
        const { to, amount } = req.body;

        const tx = await token.transfer(to, ethers.parseEther(amount));
        await tx.wait();
        return res.json({
            success: true,
            hash: tx.hash
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Check balance
const getBalance = async (req, res) => {
    try {
        const { address } = req.params;
        const balance = await token.balanceOf(address);

        return res.json({
            success: true,
            balance: ethers.formatEther(balance)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Burn token
const burnToken = async (req, res) => {
    try {
        const { amount } = req.body;
        const tx = await token.burn(amount);
        await tx.wait();

        console.log(`${amount} Tokens burned `);

        return res.json({
            success: true,
            hash: tx.hash
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Create new token
const createToken = async (req, res) => {
    try {
        const { name, symbol, supply } = req.body;
        console.log(`
            NEW TOKEN REQUEST
            -----------------
            Name: ${name}
            Symbol: ${symbol}
            Supply: ${supply}
        `);

        if (!name || !symbol || !supply) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        return res.json({
            success: true,
            message: "Token data received",
            data: {
                name,
                symbol,
                supply
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = { getTokenInfo, transferToken, getBalance, burnToken, createToken };
