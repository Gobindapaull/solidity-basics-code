import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    }
  },
};

export default config;
