const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

const fs = require('fs');
const mnemonic = fs.readFileSync("../.secret").toString().trim();
const key = fs.readFileSync("../.key").toString().trim();

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${key}`)
      },
      network_id: 3
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${key}`)
      },
      network_id: 1
    },
  }
};