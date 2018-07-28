pragma solidity ^0.4.19;

import "./Ownable.sol";

contract BountyFactory is Ownable {

    constructor () public {}

    event NewBounty(uint bountyId, string name);

    uint cooldownTime = 10 days;

    struct Bounty {
        string name;
        uint32 dueDate;
    }

    Bounty[] public bounties;

    mapping (uint => address) public bountyToOwner;
    mapping (address => uint) ownerBountyCount;

    function _createBounty(string _name) internal returns(uint){
        uint id = bounties.push(Bounty(_name, uint32(block.timestamp + cooldownTime))) - 1;
        bountyToOwner[id] = msg.sender;
        ownerBountyCount[msg.sender]++;
        emit NewBounty(id, _name);
        return id;
    }

}