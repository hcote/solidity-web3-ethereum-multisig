var InitNewWallet = artifacts.require("./InitNewWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(InitNewWallet);
};
