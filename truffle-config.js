const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
// test wallet ONLY - contains no actual ether
import {mnemonic, key} from "./keys.js"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, key)
      },
      network_id: 3
    },
    main: {
      provider: function() {
        return new HDWalletProvider(mnemonic, key)
      },
      network_id: 1
    },
  }
};