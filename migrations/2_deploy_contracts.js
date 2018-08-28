var Ownable = artifacts.require("./Ownable.sol");
var Stoppable = artifacts.require("./Stoppable.sol");
var Bounty = artifacts.require("./Bounty.sol");
var BountyHub = artifacts.require("./BountyHub.sol");

module.exports = function(deployer,network,accounts){
    deployer.deploy(Ownable);
    deployer.link(Ownable,Stoppable);
    deployer.deploy(Stoppable);

    deployer.link(Stoppable,Bounty);
    deployer.link(Ownable,Bounty);
    //deployer.deploy(Bounty);
    //sponsor, duration, goal
      deployer.deploy(Bounty,accounts[0],20,3e+18);

    deployer.link(Ownable, BountyHub);
    deployer.link(Stoppable, BountyHub);
    deployer.deploy(BountyHub);
};


  
