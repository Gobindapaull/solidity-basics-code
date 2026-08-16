const crypto = require("crypto");

const text = "hello";

const hash = crypto.createHash("sha256").update(text).digest("hex");
console.log(hash); // 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
