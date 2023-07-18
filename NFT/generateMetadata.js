const fs = require('fs')

for (let i = 0; i < 3; i++) {
    let json = {};
    json.name = "NFT Image #" + i;
    json.description = "3 NFT living on the Ethereum blockchain 🏆 " + i;
    json.image = "ipfs://Qmc8tN9XodQiedNKACBfddJkunnGEhZqDxA7oAg" + i + '.jpg';
    fs.writeFileSync(`Metadata/${i}.json`, JSON.stringify(json));
}
