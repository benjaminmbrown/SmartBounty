var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var SmartBounty = artifacts.require("./SmartBounty.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(SmartBounty);
};
