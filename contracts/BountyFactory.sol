pragma solidity ^0.4.19;

import "./Ownable.sol";

contract BountyFactory is Ownable {
    address bountyTaker;
    constructor () public {}

    event NewBounty(uint bountyId, uint amount);

    uint cooldownTime = 10 days;

    struct Bounty {
        address creator;
        uint amount;
        address taker;
        bool taken;
        bool complete;
        bool verified;
        uint32 dueDate;
    }

    Bounty[] public bounties;

    mapping (uint => address) public bountyToOwner;
    mapping (address => uint) ownerBountyCount;

    function _createBounty(uint _amt) internal returns(uint){
        uint id = bounties.push(Bounty(msg.sender,_amt, bountyTaker, false, false, false, uint32(block.timestamp + cooldownTime))) - 1;
        bountyToOwner[id] = msg.sender;
        ownerBountyCount[msg.sender]++;
        emit NewBounty(id, _amt);
        return id;
    }

}