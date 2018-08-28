# ServiceBounty
Bounty system for consensys developer certification project for Benjamin Brown.

## Prereqs

`npm install -g ganache-cli`

`npm install -g truffle`

`npm install --save vort_x vort_x-components`

## Setting up

In root folder, make sure all packages are installed

`npm install`

Start ganache `ganache-cli -p 8545 -b 1`

Compile and migrate smart contracts

`truffle compile`

`truffle migrate --reset`

Start dev server

`npm start`



# Design Pattern Decisions

I created a Bounty.sol base class for a bounty. BountyHub.sol acts as a container for campaigns and provides some adminstrative pass-through functionality.

For the front end, I am using ReactJS and a new library I came across called Vortex. It has built in functionality to bind smart contract data to front end components, which allow for live updates on the front end when information is updated in the smart contracts. For example, the front end will notify the user whenever certain events occur like:

* Contract loaded
* Certain solidity Events fired
* Transactions success and failure
* Transaction confirmations
* Changes to View/Contants in smart contracts will update the front end immediately



## Design thoughts

Given another look at it in the future, I may prefer to move more of the verification of the process/states into the Bounty.sol contract instead of locating those functions in the hub.


# Avoiding Common Attacks

See Module 9 Lesson 3

I took time to review code for common attacks including re-entrancy, overflow/underflow, and various race conditions based on the current knowledge from Consensys and other independent solidity resources.