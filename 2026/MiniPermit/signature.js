const owner = (await window.ethereum.request({
  method: "eth_accounts"
}))[0];

const domain = {
  name: "MiniPermit2",
  version: "1",
  chainId: await window.ethereum.request({ method: "eth_chainId" }),
  verifyingContract: "0xd9145CCE52D386f254917e481eB44e9943F39138"
};

const types = {
  PermitTransferFrom: [
    { name: "permitted", type: "TokenPermissions" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  TokenPermissions: [
    { name: "token", type: "address" },
    { name: "amount", type: "uint256" }
  ]
};

const value = {
  permitted: {
    token: "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
    amount: "10000000000000000000"
  },
  nonce: "1",
  deadline: "2000000000"
};

const signature = await window.ethereum.request({
  method: "eth_signTypedData_v4",
  params: [
    owner,
    JSON.stringify({
      domain,
      types,
      primaryType: "PermitTransferFrom",
      message: value
    })
  ]
});

console.log(signature);
