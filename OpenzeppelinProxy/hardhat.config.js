require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
  bscTestnet: {
    url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    accounts: [""],
  }
}
};
