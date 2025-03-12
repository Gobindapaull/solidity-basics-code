const { ethers } = require("ethers");

function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push(wallet.address);
    }
    return wallets;
}

const wallets = generateWallets(50);
console.log(wallets);

// [
//   '0xd9aC4c99FB16E415725AfD65c521A75D9FD62114',
//   '0x84d5285e5ED8f0c61E0F67060AACaE27D2a7E61b',
//   '0x95a81d3066345Adf3Ad9B7612A605F4b11484Aad',
//   '0x692c8815C6e1Efb0b5f136673E9f668B12D31f5a',
//   '0x35dd2b740259F2B75b0dCd8e7833E689977dc4CC',
//   '0xC750cf2B2bD6aAAFF5EC6A1A81A541B7F033b04A',
//   '0x8f82634762f595d6Ab10e6e6909A1A3924794C9F',
//   '0x2d19094fdE45fBCaC1109864Da834fDDF869D735',
//   '0xA604474dF69Ec76eC2a74160A50461Fa1b9A6a41',
//   '0xB8cd984aA868E0B3441a1ab3Ba2ab903E114F64D',
//   '0x9bA8A3E532E47EfFDeDFE8DBD19c546D4625eC6b',
//   '0x366529699817844149D0D15E71A28ee7FD636ac9',
//   '0xEf731E523B52b6CCabda452fff2689179BE55992',
//   '0xceF4863776965741Fe1ba774F5EBefeBfe4b3c5D',
//   '0x19D59FbF23dC2bC496A5f4EF4f45630E8FC5Ccf8',
//   '0x5b7ecd5478A8E34eCF18E82163F64E07fcd0aAE1',
//   '0xDA75f160e7730B881eb1ee6454Be3C61e93462dF'
// ]
