pragma solidity ^0.4.24;

import "./BountyFactory.sol";

contract SmartBounty is BountyFactory {

    constructor () public {}

    event BountyCreated(address indexed addr, uint amount); 
    event BountyTaken(address addr, uint bountyId);
    event BountyCompleted(address addr, uint bountyId);
    event BountyVerified(address addr, uint bountyId);
    event BountyWithdraw(address addr, uint bountyId);

    modifier ownerOf(uint _bountyId) {
        require(msg.sender == bountyToOwner[_bountyId]);
        _;
    }

    function createBounty() public payable returns(uint){
        uint bId = _createBounty(msg.value);
        emit BountyCreated(msg.sender,msg.value);
        return bId;
    }
  
    function getTakenBountyByAddr(address _addr) public view returns(uint){
        uint counter = 0;
        for (uint i = 0; i < bounties.length; i++) {
            if (bounties[i].taker == _addr) {
                return i;
            }
            counter++;
        }
    }
    
    function initiateBounty(uint _bountyId) public returns(bool){
        require(
            bounties[_bountyId].taken == false && 
            bounties[_bountyId].complete == false);

        bounties[_bountyId].taker = msg.sender;
        bounties[_bountyId].taken = true;

        emit BountyTaken(msg.sender, _bountyId);
        return true;
    }

    function isBountyInitiated(uint _bountyId) public view returns(bool){
        return bounties[_bountyId].taken;
    }
    function isBountyCompleted(uint _bountyId) public view returns(bool){
        return bounties[_bountyId].complete;
    }
    function isBountyVerified(uint _bountyId) public view returns(bool){
        return bounties[_bountyId].verified;
    }

    function getBountyStates(uint _bountyId) public view returns (bool,bool, bool){
        bool init = bounties[_bountyId].taken;
        bool complete = bounties[_bountyId].complete;
        bool verified = bounties[_bountyId].verified;
        return (init, complete, verified);
    }

    function completeBounty(uint _bountyId) public returns(bool){
        require(
            bounties[_bountyId].taker == msg.sender &&
            bounties[_bountyId].complete == false && 
            bounties[_bountyId].taken == true);
        
        bounties[_bountyId].complete = true;
        emit BountyCompleted(msg.sender, _bountyId);
    }

    function verifyBounty(uint _bountyId) public returns (bool){
        require(
            bounties[_bountyId].creator == msg.sender && 
            bounties[_bountyId].complete == true);
        
        bounties[_bountyId].verified = true;
        
        emit BountyVerified(msg.sender, _bountyId);
    }

    function withdrawBounty(uint _bountyId) public returns (bool){
        require(
            bounties[_bountyId].taker == msg.sender && 
            bounties[_bountyId].verified == true);

        uint amount = bounties[_bountyId].amount;
        bounties[_bountyId].amount = 0;
        msg.sender.transfer(amount);
        emit BountyWithdraw(msg.sender, _bountyId);
        return true;
    }

    function bountyBalance(uint _bountyId) public view returns(uint){
        return bounties[_bountyId].amount;
    }

    function getBountyAmtById(uint _bountyId) public view returns(uint){
        return bounties[_bountyId].amount;
    }

    function getBountiesByOwner(address _owner) public view returns(uint[]) {
        uint[] memory result = new uint[](ownerBountyCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < bounties.length; i++) {
            if (bountyToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getAllBounties() public view returns (uint[]){
        uint[] memory result = new uint[](bounties.length);
        //Bounty[] memory result = new Bounty[](bounties.length);
        uint counter = 0;
        for (uint i = 0; i < bounties.length; i++) {
            result[counter] = i;
            counter++;
        }
        return result;
    }

    function getBountyCount() public view returns(uint){
        return bounties.length;
    }
}
