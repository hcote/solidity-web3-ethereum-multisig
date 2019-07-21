// const path = require("path");
// const HDWalletProvider = require("truffle-hdwallet-provider");

// module.exports = {
//   contracts_build_directory: path.join(__dirname, "client/src/contracts"),
//   networks: {
//     develop: {
//       port: 8545
//     },
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/")
//       },
//       network_id: 3
//     },
//     main: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/")
//       },
//       network_id: 1
//     },
//   }
// };