const { expect } = require("chai");
describe('lottery',()=>{
  let lotto
  let manager,bob,two
  const value = ethers.utils.parseEther("2")
  const provider = ethers.provider;
  before(async ()=>{
    const Lotto = await ethers.getContractFactory("lotto");
      [manager, bob ,two, ...others] = await ethers.getSigners();
     lotto = await Lotto.deploy(value,'2000',50);
  })
   it("Status = 0 ",async function(){
     
      await lotto.deployed()
      const current_state = await  lotto.current_state()
      expect(current_state).to.equal(0)

  });
  it('orignal balance 0 for bob', async ()=>{
    const ntickets = await lotto.connect(bob).my_tickets()
    expect(ntickets).to.equal(0)
 });
 it("buying ticket",async function(){
    await lotto.buy_ticket({ value })
    const ntickets = await lotto.my_tickets()
    expect(ntickets).to.equal(1)
 });
 it('manager',async function(){
  const manager = await lotto.manager()
  console.log(manager)
 });

 it("refund ticket", async function(){
    await lotto.ticket_refund()
    const ntickets = await lotto.my_tickets()
    balance = await provider.getBalance(manager.address);

    expect(ntickets).to.equal(0)
 });
   
})