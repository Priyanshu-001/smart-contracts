const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only('NFT tests',()=>{
	let contract
	const link = "https://docs.openzeppelin.com/contracts/2.x/api/token/erc721"
	const provider = ethers.provider
	let one,two,three
	before(async ()=>{
			const Contract = await ethers.getContractFactory("NFT");
   		contract = await Contract.deploy();
      [one ,two,three,...others] = await ethers.getSigners();
     
  })
  it('checkOnwer', async function(){
  	const owner = await contract.owner()
  	expect(owner).to.equal(one.address)
  });
  it('minting',async function(){
  		 await contract.safeMint(one.address,link)
  		const bal = await contract.balanceOf(one.address)
  		expect(bal).to.equal(1)
  });
  it('view token 1',async function(){
  	const URI = await contract.tokenURI(0)
  	expect(URI).to.equal(link)
  });
 
  it('transfer',async function(){
  	await contract["safeTransferFrom(address,address,uint256)"](one.address, two.address, 0) //overloaded function
		const onwer = await contract.ownerOf(0)
		expect(onwer).to.equal(two.address)
  })
})