import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.15.0/+esm";

const USDT_ADDRESS =
    "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const USDT_DECIMALS = 6;

const USDT_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)"
];

const connectButton = document.getElementById("connectButton");
const sendButton = document.getElementById("sendButton");

const receiverInput = document.getElementById("receiver");
const amountInput = document.getElementById("amount");

const status = document.getElementById("status");

let provider;
let signer;
let usdtContract;
let walletAddress;

function showStatus(message, type = "info") {
    status.textContent = message;

    status.className = type;
}

// Connect wallet
connectButton.addEventListener("click", async () => {

    try {

        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }

        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const network = await provider.getNetwork();

        if (network.chainId !== 1n) {
            status.textContent =
                "Please switch MetaMask to Ethereum Mainnet.";
            return;
        }

        signer = await provider.getSigner();

        walletAddress = await signer.getAddress();

        usdtContract = new ethers.Contract(
            USDT_ADDRESS,
            USDT_ABI,
            signer
        );

        connectButton.textContent =
            walletAddress.slice(0, 6) +
            "..." +
            walletAddress.slice(-4);

        // Check USDT balance
        const balance = await usdtContract.balanceOf(walletAddress);

        const formattedBalance =
            ethers.formatUnits(balance, USDT_DECIMALS);

        showStatus(
            `Connected | USDT Balance: ${formattedBalance}`,
            "success"
        );

        console.log("Wallet:", walletAddress);
        console.log("USDT Balance:", formattedBalance);

    } catch (error) {

        console.error(error);

        status.textContent =
            error.shortMessage || error.message;
    }
});


// Send USDT
sendButton.addEventListener("click", async () => {

    try {

        if (!signer) {
            alert("Connect wallet first.");
            return;
        }

        const receiver = receiverInput.value.trim();
        const amount = amountInput.value.trim();

        // Receiver validation
        if (!ethers.isAddress(receiver)) {
            alert("Invalid receiver address.");
            return;
        }

        // Amount validation
        if (!amount || Number(amount) <= 0) {
            alert("Amount must be greater than 0.");
            return;
        }

        // Convert amount
        const amountInUnits =
            ethers.parseUnits(amount, USDT_DECIMALS);

        // Check USDT balance
        const balance =
            await usdtContract.balanceOf(walletAddress);

        if (amountInUnits > balance) {

            const formattedBalance =
                ethers.formatUnits(
                    balance,
                    USDT_DECIMALS
                );

            showStatus(
                `Insufficient USDT. Balance: ${formattedBalance}`,
                "error"
            );

            return;
        }

        showStatus(
            "Please confirm the transaction in MetaMask...",
            "info"
        );

        sendButton.disabled = true;

        // Send USDT
        const tx = await usdtContract.transfer(
            receiver,
            amountInUnits
        );

        console.log("TX:", tx.hash);

        showStatus(
            "Transaction submitted: " + tx.hash,
            "info"
        );

        // Wait for confirmation
        await tx.wait();

        showStatus(
            "USDT sent successfully!",
            "success"
        );

    } catch (error) {

        console.error(error);

        if (error.code === "INSUFFICIENT_FUNDS") {

            status.textContent =
                "Not enough ETH to pay gas.";

        } else if (error.code === "ACTION_REJECTED") {

            status.textContent =
                "Transaction rejected in MetaMask.";

        } else {

            status.textContent =
                error.shortMessage ||
                error.reason ||
                error.message;
        }

    } finally {

        sendButton.disabled = false;
    }
});
