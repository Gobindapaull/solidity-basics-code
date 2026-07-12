const text = `
Wallet 1: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
Wallet 2: 0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
`;

const eth = /\b0x[a-fA-F0-9]{40}\b/g;

console.log(text.match(eth));
