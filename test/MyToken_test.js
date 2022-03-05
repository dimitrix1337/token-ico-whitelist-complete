
const MyToken = artifacts.require("MyToken");

contract("Testing my token functions", (accounts) => {



  it("...Should mint all tokens to the owner contract", async () => {
    const MyToken_instance = await MyToken.new();

    // Set value of 89

    const balance = await MyToken_instance.balanceOf(accounts[0])

    assert.equal(balance, 1000000, "The tokens wasn't minted");

    const totalSupply = await MyToken_instance.totalSupply();
    assert.equal(parseInt(balance), parseInt(totalSupply), "The totalsupply isn't the same as owner balance check it.")

    await MyToken_instance.mintToken(500000);

    const new_totalSupply_after_mint = await MyToken_instance.balanceOf(accounts[0]);
    let validation = new_totalSupply_after_mint > balance

    assert.equal(validation, true, "Error while try to minting more tokens")
    
    const new_balance = await MyToken_instance.balanceOf(accounts[0])

    return assert.equal(new_balance.toString(), (parseInt(balance) + 500000).toString(), "Error minting tokens")
  });

  it("...Should transfer without errors tokens to other user", async () => {

    const MyToken_instance = await MyToken.new();
    
    const balance_address_one = await MyToken_instance.balanceOf(accounts[1])
    await MyToken_instance.transfer(accounts[1], 30000)
    const balance_address_one_2 = await MyToken_instance.balanceOf(accounts[1])
    
    return assert.equal(parseInt(balance_address_one_2), parseInt(balance_address_one+ 30000), "ERROR: TOKENS WASN'T TRANSFERED")

  })

  it(" Testing allowance and transferFrom ", async () => {

    const MyToken_instance = await MyToken.new();

    await MyToken_instance.approve(accounts[2], 500000, {from:accounts[0]})
    // test if the account[2] can spend that tokens
    allowed = await MyToken_instance.allowance(accounts[0], accounts[2])
    assert.equal(parseInt(allowed), 500000 , "Error trying allow an user")

    const balance_account_one_before = await MyToken_instance.balanceOf(accounts[1])

    await MyToken_instance.transferFrom(accounts[0], accounts[1], 250000, {from:accounts[2]});

    const balance_account_one = await MyToken_instance.balanceOf(accounts[1])

    assert.equal(parseInt(balance_account_one), parseInt(balance_account_one_before) + parseInt(250000))

  })


});
