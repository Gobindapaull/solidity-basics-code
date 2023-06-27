// getTransactionReceipt
const getTransactionReceipt = provider.getTransactionReceipt("0xa9c9f00a7e9fac43a22d1f402dad47a39e6d366adfb9a820addad5aaa25cc060")
getTransactionReceipt.then((gtr) => console.log(gtr))
getTransactionReceipt.then((gtr) => console.log('gasUsed', gtr.gasUsed.toString()))
getTransactionReceipt.then((gtr) => console.log('gasPrice', ethers.formatEther(gtr.gasPrice), 'eth'))
