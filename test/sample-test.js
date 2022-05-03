const { expect } = require("chai");
const { ethers } = require("hardhat");
let address = ''
describe("Greeter", async function () {
  let greeter
  before(async ()=>{
     const Greeter = await ethers.getContractFactory("Greeter");
     greeter = await Greeter.deploy("Hello, world!");
  })

  it("Should return the new greeting once it's changed", async function () {

    
    await greeter.deployed();
    address = greeter.address;
    expect(await greeter.greet()).to.equal("Hello, world!");
    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it('check again',async ()=>{
    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

});



