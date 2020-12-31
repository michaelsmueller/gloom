const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const { MNEMONIC, PROJECT_ID } = process.env;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, '../gloom-interface/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: 1337,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, `wss://kovan.infura.io/ws/v3/${PROJECT_ID}`);
      },
      network_id: 42,
    },
  },
  compilers: {
    solc: {
      version: '0.5.3',
      parser: 'solcjs', // Leverages solc-js purely for speedy parsing
      evmVersion: 'constantinople',
    },
  },
};
