// Every Tron mainnet address begins with T
// Tron uses Base58
// These are not allowed: 0 O I l
// TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE = 34 characters

const text = `
TRX: TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
USDT: TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj
`;

const tron = /\bT[1-9A-HJ-NP-Za-km-z]{33}\b/g;

console.log(text.match(tron));
