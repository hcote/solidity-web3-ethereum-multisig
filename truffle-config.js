const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
// test wallet ONLY - contains no actual ether
const mnemonic = "cross chat obtain casino frame hen tape load bone desert sun illness"

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
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/d26fa7f5deca4f8d952d53ca9a8d71ce")
      },
      network_id: 3
    },
  }
};
