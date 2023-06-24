import 'dotenv/config';

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const {
  ETHERSCAN_API_KEY,
  DEFAULT_SIGNER_PRIVATE_KEY,
  NETWORK_SEPOLIA_JSON_RPC_URL,
  NETWORK_MUMBAI_JSON_RPC_URL,
  SIGNER_1_PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    enabled: true,
  },
  networks: {
    avaxtestnet: {
      url: 'https://api.avax-test.network/ext/C/rpc',
      accounts: [`${DEFAULT_SIGNER_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `${NETWORK_MUMBAI_JSON_RPC_URL}`,
      accounts: [
        `${DEFAULT_SIGNER_PRIVATE_KEY}`,
        `${SIGNER_1_PRIVATE_KEY}`],
    },
    hardhat: {
      accounts: {
        accountsBalance: '100000000000000000000'
      }
    },
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`
  }
};

export default config;
