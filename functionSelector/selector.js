const ethers = require("ethers");
const fs = require("fs");

const ABI = JSON.parse(fs.readFileSync("./build/Contract_sol_Contract.abi", "utf-8"));

const iface = new ethers.Interface(ABI);

for (const fragment of iface.fragments) {
    if (fragment.type === "function") {
        const fn = iface.getFunction(fragment.name);
        const selector = fn.selector;
        const sig = fn.format();
        console.log(`${sig} => ${selector}`);
    }
}
