const crypto = require("crypto");

const text = "hello";

const hash = crypto.createHash("sha256").update(text).digest("hex");
console.log(hash); // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

const bytes8 = crypto.randomBytes(8).toString("hex");
console.log(bytes8); // 4a46c8a666f4d085

const privateKey = crypto.randomBytes(32).toString("hex");
console.log(privateKey, privateKey.length);
