import React, { Component } from "react";

export default class AdminScreen extends Component {


    render () {


        return (

            <div className="App">
                <h1 style={{fontSize:60, color:'cyan', fontFamily:'Neon 80s'}}>Neon Coin</h1>
                <h2  style={{color:'white'}}>ADMIN mode</h2>
                <h1 style={{color:'cyan'}}>{this.props.account}</h1>
                <button style={this.props.button_style} onClick={() => this.props.whitelist_function()}>CHANGE STATUS</button>
            </div>

        )

    }

}


