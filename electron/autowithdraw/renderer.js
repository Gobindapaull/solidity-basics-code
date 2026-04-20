const { ethers } = require("ethers");

// Wait until DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
    const logBox = document.getElementById("logs");

    function addLog(message, type = "info") {
        const log = document.createElement("div");
        log.classList.add("log", `log-${type}`);
        log.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;

        logBox.appendChild(log);
        logBox.scrollTop = logBox.scrollHeight;
    }

    // Override console.log
    const originalLog = console.log;
    console.log = function (...args) {
        addLog(args.join(" "), "info");
        originalLog.apply(console, args);
    };

    console.error = function (...args) {
        addLog(args.join(" "), "error");
    };

    let isRunning = false;
    let provider = null;

    window.start = async function () {
        if (isRunning) {
            console.log("⚠️ Bot already running");
            return;
        }

        const rpc = document.getElementById("rpc").value.trim();
        const privateKey = document.getElementById("privatekey").value.trim();
        const receiverAddress = document.getElementById("receiver").value.trim();

        if (!rpc || !privateKey || !receiverAddress) {
            console.error("❌ Please fill all fields");
            return;
        }

        try {
            console.log("🚀 Bot started...");
            console.log("🔗 Connecting to RPC...");

            provider = new ethers.JsonRpcProvider(rpc);
            const wallet = new ethers.Wallet(privateKey, provider);

            console.log("✅ Connected successfully");
            console.log("👛 Wallet Address:", wallet.address);

            isRunning = true;

            // 🔥 BLOCK LISTENER
            provider.on("block", async (blockNumber) => {
                if (!isRunning) return;

                try {
                    console.log(`⛓ New Block: ${blockNumber}`);

                    const balance = await provider.getBalance(wallet.address);
                     if (!isRunning) return; // ✅ check again
                    console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

                    // gas setup
                    const gasLimit = 21001n;
                    const feeData = await provider.getFeeData();
                     if (!isRunning) return; // ✅ check again
                    const gasPrice = feeData.gasPrice || ethers.parseUnits("5", "gwei");

                    const gasFee = gasLimit * gasPrice;

                    console.log(`⛽ Gas Fee: ${ethers.formatEther(gasFee)} ETH`);

                    if (balance > gasFee) {
                        const amount = balance - gasFee;

                        console.log("📤 Sweeping funds...");
                        console.log(`💸 Amount: ${ethers.formatEther(amount)} ETH`);

                        const tx = await wallet.sendTransaction({
                            to: receiverAddress,
                            value: amount,
                            gasLimit: gasLimit,
                            gasPrice: gasPrice
                        });

                          if (!isRunning) return; // ✅ prevent logs after stop
                        console.log(`⏳ TX Sent: ${tx.hash}`);

                        await tx.wait();

                        console.log("✅ Sweep complete!");
                        console.log("--------------------------------------------------");

                    } else {
                        console.log("⚠️ Not enough balance for gas");
                    }

                } catch (err) {
                    console.error("❌ Loop Error:", err.message);
                }
            });

        } catch (err) {
            console.error("❌ Error:", err.message);
        }
    };

    window.stop = function () {
        isRunning = false;

        if (provider) {
            provider.removeAllListeners("block");
            provider = null; // ✅ destroy reference
        }

        console.log("🛑 Bot stopped.");
    };

    window.clearLogs = function () {
        const logBox = document.getElementById("logs");
        logBox.innerHTML = "";
    };
});
