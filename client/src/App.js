// REACT APP IMPORTS
import React, { Component } from "react";

// WEB3 IMPORTS
import getWeb3 from "./getWeb3";
import MyTokenSale from "./contracts/MyTokenSale.json";
import Whitelist from "./contracts/Whitelist.json";
import MyToken from "./contracts/MyToken.json";


// SCREENS IMPORTS
import LoadingScreen from "./screens/screen_loading_web3";
import SuccessfullyScreen from "./screens/screen_succesfully_web3";
import AdminScreen from "./screens/screen_admin";
import UserScreen from "./screens/screen_user";

import "./App.css";

class App extends Component {
  state = { loaded:false, account:null, admin:null, input:null, amount_tokens: null, current_tokens_user:0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      
      // TokenSale instance
      this.networkId = await this.web3.eth.net.getId();

      this.MyTokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );

      // Whitelist instance
      this.WhitelistInstance = new this.web3.eth.Contract(
        Whitelist.abi,
        Whitelist.networks[this.networkId] && Whitelist.networks[this.networkId].address,
      );
      
      // Token instance
      this.TokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded:true, admin:await this.WhitelistInstance.methods._owner().call(), current_tokens_user: await this.TokenInstance.methods.balanceOf(this.accounts[0]).call()});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentDidUpdate = async () => {
    this.accounts = await this.web3.eth.getAccounts();
    this.setState({account:this.accounts[0], current_tokens_user: await this.TokenInstance.methods.balanceOf(this.accounts[0]).call()})
  }

  set_load_screen = () => {
    return <LoadingScreen/>
  }

  set_success_screen = () => {
    return <SuccessfullyScreen/>
  }

  change_status_whitelist = async () => {

    let input = this.state.input

    try {
      await this.web3.utils.toChecksumAddress(input)

      await this.WhitelistInstance.methods.whitelisten(input).send({from:this.accounts[0]})

    } catch (e) {
      console.log(e.message)
    }
  }

  see_whitelist_status = async () => {
    let result = await this.WhitelistInstance.methods.whitelisted(this.accounts[0]).call()

    console.log(result)
  }

  buy_tokens = async () => {
    if (this.state.amount_tokens > 10) {
      try {
        await this.MyTokenSaleInstance.methods.buyTokens(this.accounts[0]).send({value:this.state.amount_tokens, from:this.accounts[0]})
      } catch (e) {
        alert(e.message)
      } 
    } else {
      alert("Minimun amount of tokens is 10.")
    }

  }

  render() {

    if (!this.state.loaded) {
      return this.set_load_screen()
    }
    if (this.accounts[0] !== this.state.admin) {
      return (
        <div>
              <UserScreen account={this.accounts[0]}/> 
              CURRENT BALANCE: <h1>{this.state.current_tokens_user}</h1>
              <input type="text" name="tokens_amount" onChange={(amount) => this.setState({amount_tokens: amount.target.value})}/>
              <button onClick={() => this.buy_tokens()}>Buy tokens</button>
              <button onClick={() => this.see_whitelist_status()}>See if im on the whitelist</button>      
        </div> 
      )
    } else {
      return  ( 
        <div>
           <AdminScreen account={this.accounts[0]} whitelist_function={() => this.change_status_whitelist()}  />
           Whitelist address: <input type="text" name="change_address_whitelisted" onChange={(text) => this.setState({input: text.target.value})}/>

        </div>
      )
    }

  }
}

export default App;
