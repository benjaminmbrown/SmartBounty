pragma solidity ^0.4.24;

import "./BountyFactory.sol";

contract SmartBounty is BountyFactory {

    constructor () public {}

    modifier ownerOf(uint _bountyId) {
        require(msg.sender == bountyToOwner[_bountyId]);
        _;
    }

    function getBountiesByOwner(address _owner) external view returns(uint[]) {
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


}
