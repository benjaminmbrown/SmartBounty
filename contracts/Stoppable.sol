pragma solidity ^0.4.24;

import "./Ownable.sol";

contract Stoppable is Ownable {
    
    bool public running;
    
    event LogRunSwitch(address sender, bool switchSetting);
        
    modifier onlyIfRunning { 
        require(running, "not running"); 
        _;
    }
        
    constructor() public {
        running = true;
    }
        
    function runSwitch(bool onOff)
        public
        onlyOwner
        returns(bool success)
    {
        running = onOff;
        emit LogRunSwitch(msg.sender, onOff);
        return true;
    }
        
}