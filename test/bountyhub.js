const BountyHub = artifacts.require('./BountyHub.sol');
const Bounty = artifacts.require('./Bounty.sol');
contract('BountyHub', (accounts) => {
    let bountyHub;
    let sponsor = accounts[0];
    let donor = accounts[1];
    let bountyTaker = accounts[3];
    let createdBountyAddress;
    let createdBounty;

    beforeEach('set up Hub contract for each test', async () => {
        bountyHub = await BountyHub.deployed();
    });

    describe('Bounty Hub Initialization', async () => {
        it('should start with zero campaigns', async () => {
            const bountyCount = await bountyHub.getBountyCount.call();
            assert(bountyCount, 0, 'Error: hub should have zero bounties');
        })

        it('should be able to create a bounty', async () => {
            const contribution = 1e+18;
            let startBountyCount =  await bountyHub.getBountyCount.call();
            let goal = 15;
            let duration = 30;
            try {
                createdBounty = await bountyHub.createBounty(duration,goal,{from: donor})
            } catch (error) {
                assert(error.toString().includes('VM Exception'), error.toString())
            }
        
            createdBountyAddress = createdBounty.logs[0].args.bounty;
            let upadatedCount = await bountyHub.getBountyCount.call();

            assert.equal(createdBounty.logs[0].event,                     'LogNewBounty',    'Bounty creation did not occur')
            assert.equal(createdBounty.logs[0].args.duration.toNumber(),  duration,          'Bounty duration was not set correctly');
            assert.equal(createdBounty.logs[0].args.goal.toNumber(),      goal,              'Bounty goal was not set correctly');
            assert.equal(createdBounty.logs[0].args.sponsor,              donor,             'Bounty Sponsor mismatch');
            assert.equal(await upadatedCount.toNumber(),                  startBountyCount+1,'Bounty count not updated properly');
        
        });
        it('should be able to pause a bounty', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.startBounty(createdBountyAddress, {from: sponsor})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,              'LogBountyStarted', 'Bounty starting did not occur');
            assert.equal(thisTx.logs[1].args.switchSetting, true,               'Stop switch did not set to true ');
        });

        it('should be able to restart a bounty', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.stopBounty(createdBountyAddress, {from: sponsor})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,              'LogBountyStopped', 'Bounty stoppage did not occur');
            assert.equal(thisTx.logs[1].args.switchSetting, false,              'Stop switch did not set to false ');
        });

        it('should be able to transfer ownership of a bounty', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.changeBountyOwner(createdBountyAddress, donor, {from: sponsor})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,         'LogBountyNewOwner', 'Bounty stoppage did not occur');
            assert.equal(thisTx.logs[0].args.newOwner, donor,               'bounty not transferred to new owner');
        });

        it('should allow an account to take/initiate a bounty', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.initiateBounty(createdBountyAddress, {from: bountyTaker})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,         'LogBountyTaken',    'Bounty initiation event did not occur');
            assert.equal(thisTx.logs[0].args.addr, bountyTaker,             'bounty not initiated by taker');
            assert.equal(thisTx.logs[0].args.bounty, createdBountyAddress,  'bounty not initiated by taker');
      
        })

        it('should allow an taker to set a bounty (they have taken) as complete', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.completeBounty(createdBountyAddress, {from: bountyTaker})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,         'LogBountyCompleted',    'Bounty completion event did not occur');
            assert.equal(thisTx.logs[0].args.addr,      bountyTaker,            'bounty completion failed');
            assert.equal(thisTx.logs[0].args.bounty,    createdBountyAddress,   'bounty completion failed');
        });

        it('should allow the bounty sponsor to verify a completed bounty', async()=>{
            let thisTx;
            try{
                thisTx = await bountyHub.verifyBountyCompleted(createdBountyAddress, {from: sponsor})
            } catch (error){
                assert(error.toString().includes('Assertion'), error.toString());
            }
            assert.equal(thisTx.logs[0].event,         'LogBountyVerified',     'Bounty verification event did not occur');
            assert.equal(thisTx.logs[0].args.addr,      sponsor,                'bounty verification failed');
            assert.equal(thisTx.logs[0].args.bounty,    createdBountyAddress,   'bounty verification failed');
       
        });

        it('should allow bounty taker to claim funds in a verified bounty they have taken ', async()=>{
            let thisTx;
            let startFunds;
            let contribution = 1e+18;
            let existingBounty = await Bounty(createdBountyAddress);
            console.log(cr)
            instance.getBalanceOf.call(ContractInstance.address)
           
            console.log("EB",existingBounty);
            
            try {
                await existingBounty.contribute({
                    value: contribution,
                    from: sponsor
                })
            } catch (error) {
                assert(error.toString().includes('VM Exception'), error.toString())
            }

            let takerBalanceStart = await web3.eth.getBalance(bountyTaker).toNumber()

            try{
                thisTx = await bountyHub.claimBounty(createdBountyAddress, {from: bountyTaker})
            } catch (error){
                assert(error.toString().includes('VM Exception'), error.toString());
            }

            assert.equal(web3.eth.getBalance(createdBountyAddress).toNumber(),0,'Bounty address did not update');
            assert.equal(web3.eth.getBalance(bountyTaker).toNumber() ,takerBalanceStart + contribution,'Bounty taker not updated');
       
        });
    });
});