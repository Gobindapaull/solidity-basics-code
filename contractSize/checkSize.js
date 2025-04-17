const fs = require("fs");
const path = require("path");

const bytecodePath = path.join(__dirname, "./Sload_sol_Sload.bin");

try {
    let bytecode = fs.readFileSync(bytecodePath, 'utf8').trim();

    if (bytecode.startsWith("0x")) {
        bytecode = bytecode.slice(2);
    }

    const sizeInBytes = bytecode.length / 2;

    console.log(`🔍 Bytecode length: ${bytecode.length} hex characters`);
    console.log(`📦 Contract size: ${sizeInBytes} bytes`);

    if (sizeInBytes > 24576) {
        console.warn("⚠️ Contract exceeds the 24KB limit");
    } else {
        console.log("✅ Contract is within the 24KB limit")
    }
} catch (error) {
    console.log('Error reading bytecode: ', error);
}
