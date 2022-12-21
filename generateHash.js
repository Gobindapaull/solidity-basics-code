const sha256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return sha256(this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }
    generateGenesisBlock() {
        return new Block('2022-12-22', 'GENESIS', '0000');
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isBlockchainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousHash = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousHash.hash) {
                return false;
            }
        }
        return true;
    }
}
const coin = new Blockchain();
const block = new Block('2022-12-22', { price: 1500 }, 'abcd');
coin.addBlock(block);

console.log(block);
console.log(coin);

console.log(coin.isBlockchainValid());
coin.chain[1].data = "HACKED";
console.log(coin);
console.log('hacked blockchain' + coin.isBlockchainValid());
