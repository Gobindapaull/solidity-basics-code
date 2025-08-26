const crypto = require("crypto");

const hexId = crypto.randomBytes(8).toString("hex");
console.log(hexId); // 031a85582d00b821

const id = hexId.slice(0, 8).toUpperCase();
console.log(id); // 608F20AA
