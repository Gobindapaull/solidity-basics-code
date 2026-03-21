"use client";

import { useState } from "react";

interface Token {
  name: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
}

export default function Home() {
  const [address, setAddress] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTokens() {
    if (!address) return;

    setLoading(true);

    const res = await fetch(`/api/tokens?address=${address}`);
    const data = await res.json();

    setTokens(data.tokens || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white flex items-center justify-center">
      <div className="w-full max-w-6xl px-6">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 tracking-tight">
          Wallet Explorer
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Track any Ethereum wallet instantly
        </p>

        {/* Input */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 mb-10 shadow-xl">
          <input
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={fetchTokens}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 font-semibold transition"
          >
            Scan
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 animate-pulse">
            Scanning blockchain...
          </div>
        )}

        {/* Tokens */}
        {!loading && tokens.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tokens.map((token, i) => (
              <div
                key={i}
                className="group relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold">
                    {token.name}
                  </h2>

                  <p className="text-sm text-gray-400 mb-3">
                    {token.symbol}
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    {token.contractAddress}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-blue-400">
                      {token.decimals} decimals
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && tokens.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No tokens found
          </p>
        )}
      </div>
    </main>
  );
}
