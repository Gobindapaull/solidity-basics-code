const fs = require('fs')
const solc = require('solc')

const source = fs.readFileSync('Token.sol', 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Token.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
            }       
    }
}

const tempFile = JSON.parse(solc.compile(JSON.stringify(input)))
const contractFile = tempFile.contracts['Token.sol']['Smart']

module.exports = contractFile
