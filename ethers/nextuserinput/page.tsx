"use client";

import { ethers } from "ethers";
import { useState } from "react";

const provider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

export default function Home(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<{
    address: string;
    balance: string;
  } | null>(null);

  const balanceShow = async () => {
    const walletFromPrivateKey = new ethers.Wallet(input);
    const balance = ethers.formatEther(
      await provider.getBalance(walletFromPrivateKey),
    );
    setResult({
      address: walletFromPrivateKey.address,
      balance,
    });
  };

  const handleSubmit = (): void => {
    setShowResult(true);
    balanceShow();
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>⚠️ Private Key Awareness Demo</h1>

      <div style={styles.alert}>
        🚨 NEVER enter your real private key on any website.
        <br />
        This demo shows how scam UIs trick users.
      </div>

      <input
        type="password"
        placeholder="Example Private Key (DO NOT USE REAL KEY)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.fancyInput}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Continue
      </button>

      {showResult &&
        result &&(
            <h4>
              Wallet address: {result.address} <br />
              Balance: {result.balance} ETH
            </h4>
        )}
    </main>
  );
}

type StyleMap = {
  [key: string]: React.CSSProperties;
};

const styles: StyleMap = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
  },
  alert: {
    backgroundColor: "#7f1d1d",
    padding: "14px",
    borderRadius: "8px",
    maxWidth: "420px",
    textAlign: "center",
    fontSize: "14px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
  },
  result: {
    backgroundColor: "#1f2937",
    padding: "16px",
    borderRadius: "8px",
    maxWidth: "420px",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  fancyInput: {
    width: "380px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#fff",
    fontSize: "15px",
    letterSpacing: "0.5px",
    outline: "none",
    boxShadow: "0 0 0 rgba(220,38,38,0)",
    transition: "all 0.25s ease",
  },
};
