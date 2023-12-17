import { Alchemy } from "alchemy-sdk";
const alchemy = new Alchemy()

alchemy.nft.getNftsForOwner('vitalik.eth').then(nfts => {
    console.log(nfts.totalCount)
})
