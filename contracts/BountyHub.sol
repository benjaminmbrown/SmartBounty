
pragma solidity ^0.4.18; 

import "./Bounty.sol";

/**
 * @title BountyHub Contract
 * @author  Benjamin M. Brown <ben@chainwave.io>
 * @dev The bounty hub contract acts as a container for bounties and keeps track of newly created bounties.
 * In addition to creative mechanisms, the bounty hub also provides some pass through administrative functionality
 * which allows the bounty to be stopped, started, and ran through the process

 */

contract BountyHub is Stoppable {
    
    address[] public bounties;
    mapping(address => bool) public bountyExists;
    mapping(address => address) public bountiesTakenBy;
    mapping(address => address) public bountiesCompletedBy;
    mapping(address => bool) public bountyVerified;
    
    //----MODIFIERS ----//
    modifier onlyIfBounty(address bounty) {
        require(bountyExists[bounty], "bounty does not exist");
        _;
    }

    modifier onlyNotTaken(address bounty){
        require(bountiesTakenBy[bounty] == address(0), "Bounty already taken");
        _;
    }
    modifier onlyNotCompleted(address bounty){
        require(bountiesCompletedBy[bounty] == address(0), "Bounty already completed");
        _;
    }

    modifier onlyCompleted(address bounty){
        require(bountiesCompletedBy[bounty] != address(0), "Bounty not completed yet");
        _;
    }

    modifier onlyNotVerified(address bounty){
        require(bountyVerified[bounty] == false, "Bounty already verified");
        _;
    }

    modifier hasTakenBounty(address bounty, address taker){
        require(bountiesTakenBy[bounty]==taker, "Taker has not taken this bounty");
        _;
    }

    modifier hasCompletedBounty(address bounty, address taker){
        require(bountiesCompletedBy[bounty]==taker, "Taker has not completed this bounty");
        _;
    }
    
    //----EVENTS ----//

    event LogNewBounty(address sponsor, address bounty, uint duration, uint goal);
    event LogBountyStopped(address sender, address bounty);
    event LogBountyStarted(address sender, address bounty);
    event LogBountyNewOwner(address sender, address bounty, address newOwner);
    event LogBountyTaken(address addr, address bounty);
    event LogBountyCompleted(address addr, address bounty);
    event LogBountyVerified(address addr, address bounty);
    event LogBountyWithdraw(address addr, address bounty);
    
    /**
    * @author Benjamin M. Brown
    * @dev outside party can take the bounty if it's not taken etc
    * @notice anyone can take a bounty in this case 
    * @param bounty Address of bounty itself
    */

    function initiateBounty(address bounty) 
    public 
    onlyIfBounty(bounty)
    onlyNotTaken(bounty)
    onlyNotCompleted(bounty)
    returns (bool){
        bountiesTakenBy[bounty] = msg.sender;
        emit LogBountyTaken(msg.sender,bounty);
        return true;
    }

    /**
    * @author Benjamin M. Brown
    * @dev outsid party can complete the bounty if party has taken it
    * @param bounty Address of bounty itself
    */

    function completeBounty(address bounty)
    public 
    onlyIfBounty(bounty)
    hasTakenBounty(bounty, msg.sender)
    onlyNotCompleted(bounty)
    returns (bool)
    {
        bountiesCompletedBy[bounty] = msg.sender;
        emit LogBountyCompleted(msg.sender,bounty);
        return true;
    }

     /**
    * @author Benjamin M. Brown
    * @dev bounty sponsor can verify the bounty
    * @param bounty Address of bounty itself
    */

    function verifyBountyCompleted(address bounty)
    public 
    onlyIfBounty(bounty)
    onlyCompleted(bounty)
    onlyNotVerified(bounty)
    
    returns (bool)
    {   
        Bounty trustedBounty = Bounty(bounty);

       // require(trustedBounty.sponsor() == msg.sender, "Is not bounty sponsor");
        bountyVerified[bounty] = true;
        emit LogBountyVerified(msg.sender,bounty);
        return true;
    }

    /** 
    * @author Benjamin M. Brown
    * @dev Constructor that sets the bounty's attributes.
    * @return uint bountyCount The current length of bounties array
    */

    function getBountyCount()
        public
        view
        returns(uint bountyCount)
    {
        return bounties.length;
    }
    
    /** 
     * @author Benjamin M. Brown
     * @dev bounty creation and management
     * @param bountyDuration The time that the bounty should run before failing
     * @param bountyGoal The financial goal of the bounty in Wei
     * @return bountyContract The address of the newly created bounty
     */
    
    function createBounty(uint bountyDuration, uint bountyGoal)
        public
        returns(address bountyContract)
    {
        Bounty trustedBounty = new Bounty(msg.sender,bountyDuration, bountyGoal);
        bounties.push(trustedBounty);
        bountyExists[trustedBounty] = true;
        emit LogNewBounty(msg.sender, trustedBounty, bountyDuration, bountyGoal);
        return trustedBounty;
    }
    // Pass-through controls

    /*
    * @author Benjamin M. Brown 
    * @dev pass through admin function to stop a bounty
    * @param bounty address of the bounty that should be stopped
    * @return success bool if bounty was successfully stopped
    */
    
    function stopBounty(address bounty) 
        public
        onlyOwner
        onlyIfBounty(bounty)
        returns(bool success)
    {
        Bounty trustedBounty = Bounty(bounty);
        emit LogBountyStopped(msg.sender, bounty);
        return(trustedBounty.runSwitch(false));
    }


    /** 
    * @author Benjamin M. Brown
    * @dev pass through admin function to restart a stopped bounty
    * @param bounty address of the bounty that should be stopped
    * @return success bool if bounty was successfully started
    */
    
    function startBounty(address bounty) 
        public
        onlyOwner
        onlyIfBounty(bounty)
        returns(bool success)
    {
        Bounty trustedBounty = Bounty(bounty);
        emit LogBountyStarted(msg.sender, bounty);
        return(trustedBounty.runSwitch(true));        
    }

    /** 
    * @author Benjamin M. Brown
    * @dev pass through admin function to change owners of a bounty in the Ownable.sol contract
    * @param bounty address of the bounty where change of ownership is needed
    * @param newOwner address of the new owner 
    * @return success bool if bounty was successfully started
    */
    
    function changeBountyOwner(address bounty, address newOwner) 
        public onlyOwner
        onlyIfBounty(bounty)
        returns(bool success)
    {
        Bounty trustedBounty = Bounty(bounty);
        emit LogBountyNewOwner(msg.sender, bounty, newOwner);
        return(trustedBounty.transferOwnership(newOwner));
    }
    
}