var MultiSig = artifacts.require("./MultiSig.sol");

module.exports = function(deployer) {
  deployer.deploy(MultiSig, "0x846Cb89515b6EaE52fBC70b9B4FF4DCa06CE7283", "0x6d0dd659b8b776e347fb2Fb45d8D6d12353e74a7");
};
