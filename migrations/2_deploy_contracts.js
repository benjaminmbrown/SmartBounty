var SimpleStorage = artifacts.require("./SimpleStorage.sol");

var Ownable = artifacts.require("./Ownable.sol");
var BountyFactory = artifacts.require("./BountyFactory.sol");
var SmartBounty = artifacts.require("./SmartBounty.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Ownable);
  deployer.link(Ownable,BountyFactory);
  deployer.deploy(BountyFactory);
  deployer.link(BountyFactory,SmartBounty);
  deployer.deploy(SmartBounty);
};
