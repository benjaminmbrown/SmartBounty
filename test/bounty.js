const Bounty = artifacts.require("./Bounty.sol");

contract('Bounty', (accounts) => {
    let bounty;
    let sponsor = accounts[0];
    let donor = accounts[1];
    let duration = 20;
    let goal = 3e+18;

    beforeEach('set up contract for each test', async () => {
        bounty = await Bounty.new(sponsor, duration, goal);
    });

    describe('Bounty Setup and Funding', async() =>{
        it('should be able to create a new bounty', async()=>{
            const bountySponsor = await bounty.sponsor.call();
            const bountyDeadline = await bounty.deadline.call();
            const bountyGoal =  await bounty.goal.call();
            const block = await web3.eth.getBlock("latest");

            assert.equal(bountySponsor,               sponsor,                "Bounty sponsor set incorrectly");
            assert.equal(bountyDeadline.toNumber(),   block.number + duration,"Bounty deadline set incorrectly");
            assert.equal(bountyGoal.toNumber(),       goal,                   "Bounty goal set incorrectly");   
        })

        it('should be sponsor to add more funds to the bounty', async()=>{

            const contribution = 1e+18;
            const startFunds = await bounty.fundsRaised.call();

            try {
                await bounty.contribute({
                    value: contribution,
                    from: sponsor
                })
            } catch (error) {
                assert(error.toString().includes('VM Exception'), error.toString())
            }


            assert.equal(await bounty.fundsRaised.call(), startFunds.toNumber()+contribution, "Contribution failed");
       

        })
        it('should allow any other user to fund the bounty', async()=>{
            const contribution = 1e+18;
            const startFunds = await bounty.fundsRaised.call();

            try {
                await bounty.contribute({
                    value: contribution,
                    from: donor
                })
            } catch (error) {
                assert(error.toString().includes('VM Exception'), error.toString())
            }
            assert.equal(await bounty.fundsRaised.call(), startFunds.toNumber()+contribution, "Contribution failed");
       
        })


        
  
    })



});
