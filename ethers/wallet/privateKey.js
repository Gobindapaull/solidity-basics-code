const ethers = require('ethers')

for ( let i = 0; i < 4; i++) {
    const wallet = ethers.Wallet.createRandom()

    console.log(wallet.privateKey)
    console.log(wallet.address)

}

// 0xfe0eae883dcfb29db9bab4bc33de49b0739b04af2b0f8b3c78bd793029f49925
// 0x5caD73a3BA88281758150A4C89738FdD2d5Ea7d3

// 0x59a5c871f73c7b75644925c17cec5e28ad07b943b111ff471a3f892567641f1a
// 0xDc629f4626F8056A89f736186decE98d7D9b9b5b

// 0x1ee63095fb68d9455ce67b9be6f83ed0bb469d4bef611cab49fefea8f2acc947
// 0xe12299Cc8c563b2952c2585Fd58Ab4a7b0aC6251

// 0x9dfdb42de05cf4e41cb3f5b3b3fa168c1392793b2ceffb0a539725e7eaa3ff94
// 0xCe89972b699C67ce54813Ce53F639be863e137B7
