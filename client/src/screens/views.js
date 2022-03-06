import React, { Component } from "react";

export default class Views extends Component {
    render() {

        if (!this.props.loaded) {
            return this.props.set_load_screen()
          }
          if (this.props.accounts !== this.props.admin) {
            return (
              <body style={{height:this.getWindowDimensions()['height'], justifyContent:'center', display:"flex", flexDirection:'column', padding:50, background:'linear-gradient(to bottom, black, #111D54)', alignItems:'center', textAlign:'center', marginTop:-22}}>
                      <div style={{boxShadow: "10px 10px 40px 30px cyan",borderRadius:25, padding:60, backgroundColor:'#0B1130', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center'}}>
                      <UserScreen account={this.props.accounts}/> 
                      <h2>Current balance</h2>
                      <h1 style={{color:'white', fontSize:72}}>{this.props.current_tokens_user} TOKENS</h1>
                      <input style={this.props.input} placeholder="INSERT AMOUNT OF TOKENS" type="text" name="tokens_amount" onChange={(amount) => this.setprops({amount_tokens: amount.target.value})}/>
                      <button style={this.props.button} onClick={() => this.buy_tokens()}>BUY TOKENS</button>
                      <h2 style={{color:'cyan', cursor:'pointer'}} onClick={() => this.see_whitelist_status()}>I'm on whitelist?</h2> 
                      </div>
              </body>
            )
          } else {
            return  ( 
              <body>
      
                <body style={{height:this.props.getWindowDimensions()['height'], display:"flex", flexDirection:'column', padding:50, background:'linear-gradient(to bottom, black, #111D54)', alignItems:'center', textAlign:'center', marginTop:-22}}>
                        <div style={{boxShadow: "10px 10px 40px 30px cyan",borderRadius:25, padding:60, backgroundColor:'#0B1130', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center'}}>
                        <AdminScreen account={this.accounts[0]} button_style={this.props.button} whitelist_function={() => this.change_status_whitelist()}  />
                        <h2 style={{color:'white'}}>Current balance</h2>
                        <input type="text" placeholder="ADDRESS" style={this.props.input} name="change_address_whitelisted" onChange={(text) => this.props.setprops({input: text.target.value})}/>
      
                        </div>
                </body>
      
              </body>
            )
          }
    }
}
