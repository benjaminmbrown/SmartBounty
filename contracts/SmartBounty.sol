pragma solidity ^0.4.24;

import "./BountyFactory.sol";

contract SmartBounty is BountyFactory {
    uint testData;

    constructor () public {}

    event CreateBounty(address indexed addr, string name); 

    modifier ownerOf(uint _bountyId) {
        require(msg.sender == bountyToOwner[_bountyId]);
        _;
    }

    function createBounty(string _name) public returns(uint){
        testData ++;
        uint bId = _createBounty(_name);
        emit CreateBounty(msg.sender,_name);
        return bId;
    }
    
    function getTestData() public view returns (uint){
        return testData;
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

    uint storedData;
    event Test(address indexed _who);

    function set(uint x) public {
        if (x == 5)
          revert();
        storedData = x;
        emit Test(msg.sender);
    }

    function times(uint x) public view returns (uint) {
        return storedData * x;
    }

    function get() public view returns (uint) {
        return storedData;
    }


}
