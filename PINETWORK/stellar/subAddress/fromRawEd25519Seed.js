const bip39 = require("bip39")
const ed25519 = require("ed25519-hd-key")
const steller = require("stellar-sdk")

const mnemonic = "dice will sun economy truly fold pioneer output pepper impact parrot length diagram aware basic drastic keep secret trust lizard auction hollow world engage"

const bot = async () => {
    const seed = await bip39.mnemonicToSeed(mnemonic)
    const index = 0

    const derived = ed25519.derivePath(`m/44'/148'/${index}'`, seed.toString("hex"))
    const keypair = steller.Keypair.fromRawEd25519Seed(Buffer.from(derived.key))

    console.log(`sub wallet public key: ${keypair.publicKey()}`)
    console.log(`sub wallet secret key: ${keypair.secret()}`)
}

bot()
