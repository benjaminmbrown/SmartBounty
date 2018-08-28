# Design Pattern Decisions

I created a Bounty.sol base class for a bounty. BountyHub.sol acts as a container for campaigns and provides some adminstrative pass-through functionality.

For the front end, I am using ReactJS and a new library I came across called Vortex. It has built in functionality to bind smart contract data to front end components, which allow for live updates on the front end when information is updated in the smart contracts. For example, the front end will notify the user whenever certain events occur like:

* Contract loaded
* Certain solidity Events fired
* Transactions success and failure
* Transaction confirmations
* Changes to View/Contants in smart contracts will update the front end immediately



## Afterthought

Given another look at it in the future, I may prefer to move more of the verification of the process/states into the Bounty.sol contract instead of locating those functions in the hub.