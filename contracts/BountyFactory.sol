pragma solidity ^0.4.19;

import "./Ownable.sol";

contract BountyFactory is Ownable {

    constructor () public {}

    event NewBounty(uint bountyId, string name, string desc);

    uint cooldownTime = 10 days;

    struct Bounty {
        string name;
        string description;
        uint32 dueDate;
    }

    Bounty[] public bounties;

    mapping (uint => address) public bountyToOwner;
    mapping (address => uint) ownerBountyCount;

    function _createBounty(string _name, string _desc) internal {
        uint id = bounties.push(Bounty(_name, _desc, uint32(block.timestamp + cooldownTime))) - 1;
        bountyToOwner[id] = msg.sender;
        ownerBountyCount[msg.sender]++;
        emit NewBounty(id, _name, _desc);
    }

}