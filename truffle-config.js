const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, '../gloom-interface/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '13',
    },
  },
  compilers: {
    solc: {
      version: '0.5.3',
      // version: '0.6.2',
      parser: 'solcjs', // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          // runs: 1500,
        },
        // evmVersion: 'istanbul',
        evmVersion: 'constantinople',
      },
    },
  },
};
