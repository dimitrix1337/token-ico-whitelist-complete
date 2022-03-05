var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol")
const whitelist = artifacts.require("Whitelist")

module.exports = async function(deployer) {
  
  let addr = await web3.eth.getAccounts()
  
  await deployer.deploy(MyToken);
  await deployer.deploy(whitelist)
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, whitelist.address);
  
  const token_instance = await MyToken.deployed()

  await token_instance.transfer(MyTokenSale.address, 1000000)

};
