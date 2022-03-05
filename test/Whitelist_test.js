
const whitelist = artifacts.require("Whitelist")

contract("Test the whitelist allowed to buy tokens", (accounts) => {

    it ("It should be add an address and remove", async () => {
        let Whitelist = await whitelist.deployed()

        await Whitelist.whitelisten(accounts[2])
        let result = await Whitelist.whitelisted(accounts[2])
        assert.equal(result, true, "ERROR: Whitelist doesn't work good")

        await Whitelist.whitelisten(accounts[2])
        result = await Whitelist.whitelisted(accounts[2])
        assert.equal(result, false, "ERROR: Whitelist doesn't work good")       
    })

} )