const crypto = require("crypto");

const id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
console.log(id); // 608F20AA
