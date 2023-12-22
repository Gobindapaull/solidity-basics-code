require("dotenv").config();
const apiKey = process.env.API_KEY;
const ethers = require("ethers");

const main = async () => {
  // Total Supply Of BNB
  const url = await fetch(
    `https://api.bscscan.com/api?module=stats&action=bnbsupply&apikey=${apiKey}`
  );
  const res = await url.json();
  console.log(`Total BNB : ${ethers.formatEther(res.result)} BNB`);

  // BNB Price
  const price = await fetch(
    `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${apiKey}`
  );
  const res1 = await price.json();
  console.log(`BNB Price : ${res1.result["ethusd"]} BNB`);

      // Validators List
  const validators = await fetch(
    `https://api.bscscan.com/api?module=stats&action=validators&apikey=${apiKey}`
  );
  const res2 = await validators.json();
  console.log(`Validators Address : ${res2.result[0].validatorAddress}\nbscscan link : https://bscscan.com/address/${res2.result[0].validatorAddress}`)
};

main();
