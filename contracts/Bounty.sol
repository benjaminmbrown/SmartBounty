pragma solidity ^0.4.24;

import "./Stoppable.sol";

/**
 * @title Bounty
 * @author  Benjamin M. Brown <ben@chainwave.io>
 * @dev DESCRIPTION
 * The bounty contract represents an instance of a single bounty and its functionality. A bounty
 * is kind of an open-ended process where sponsors and funders can continually contribute to a bounty 
 * until either it is claimed or taken by a bounty taker, or the deadline passes without a taker
 */


contract Bounty is Stoppable {
 
    address public sponsor;
    uint    public deadline;
    uint    public goal;
    uint    public fundsRaised;
    uint    public refunded;
    bool    public verified;
    
    struct FunderStruct {
        uint amountContributed;
        uint amountRefunded;
    }
    
    mapping (address => FunderStruct) public funderStructs;
    
    modifier onlySponsor { 
        require(msg.sender == sponsor, "not a sponsor");
        _; 
    }
    
    event LogContribution(address sender, uint amount);
    event LogRefundSent(address funder, uint amount);
    event LogWithdrawal(address beneficiary, uint amount); 
    event LogVerified(address sender); 

    /** 
    * @author Benjamin M. Brown
    * @dev Constructor that sets the bounty's attributes.
    * @param bountySponsor address of the creator of the bounty
    * @param bountyDuration time that the bounty should run before failing
    * @param bountyGoal the financial goal of the bounty in Wei
    */
    
    constructor (address bountySponsor, uint bountyDuration, uint bountyGoal) public {
        sponsor = bountySponsor;
        deadline = block.number + bountyDuration;
        goal = bountyGoal;
    }
    
    /**
      * @author Benjamin M. Brown
    * @dev Check if this bounty is successful.
    * @return A boolean of success if funds are raised to the goal
    */
    function isSuccess()
        public
        view
        returns(bool isIndeed)
    {
        return(fundsRaised >= goal);
    }

    /**
      * @author Benjamin M. Brown
    * @dev Check if this bounty has failed.
    * @return A boolean expressing bounty failure if goal is not met before deadline
    */
    
    function hasFailed()
        public
        view
        returns(bool hasIndeed)
    {
        return(fundsRaised < goal && block.number > deadline);
    }


    /**
      * @author Benjamin M. Brown
    * @dev Apply contributions to this bounty
    * @return true if a contribution passes all requriements and is successfully applied
    */
    
    function contribute() 
        public
        onlyIfRunning
        payable 
        returns(bool success) 
    {
        require(msg.value > 0,  "msg.value is not greater than zero");
        require(!isSuccess(),  "bounty is already a success");
        require(!hasFailed(), "bounty has failed already");
        
        if(funderStructs[msg.sender].amountContributed > 0) {
            FunderStruct storage funderStruct = funderStructs[msg.sender];
            funderStruct.amountContributed += msg.value;
        } else {
            funderStruct.amountContributed = msg.value;
            funderStruct.amountRefunded = 0;
        }
        
        fundsRaised += msg.value;
        emit LogContribution(msg.sender, msg.value);
        return true;
    }
    
    /**
    * @author Benjamin M. Brown
    * @dev Sponsor/Creator can withdraw contributions to this bounty while the bounty is running
    * @return true if sponsor can successfully withdraw funds
    */
    function withdrawFunds() 
        public
        onlySponsor
        onlyIfRunning
        returns(bool success) 
    {
        require(isSuccess(), "bounty not successful");
        
        uint amount = address(this).balance;
        refunded += amount;
        owner.transfer(amount);
        emit LogWithdrawal(owner, amount);
        return true;
    }

    /**
       @author Benjamin M. Brown
    @dev Allows a funder to request and receive a refund
    @return success if requirements pass and refund is sent
    */
    function requestRefund()
        public
        onlyIfRunning
        returns(bool success) 
    {
        uint amountOwed = funderStructs[msg.sender].amountContributed - funderStructs[msg.sender].amountRefunded;
        require(amountOwed > 0, "there is no amount owed");
        require(hasFailed(), "the campaign did not fail yet");
        
        funderStructs[msg.sender].amountRefunded += amountOwed;
        msg.sender.transfer(amountOwed);
        emit LogRefundSent(msg.sender, amountOwed);
        return true;
    }

    /**
    @author Benjamin M. Brown
    @dev Allows a funder to request and receive a refund
    @return success if requirements pass and refund is sent
    */

    function verify()
    public
    onlySponsor()
    returns (bool success){
            
        verified = true;
        emit LogVerified(sender);
    }
    
}