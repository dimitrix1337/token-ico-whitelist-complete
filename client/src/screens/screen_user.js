import React, { Component } from "react";

export default class UserScreen extends Component {

    render () {


        return (

            <div className="App">
                <h1 style={{fontSize:60, color:'cyan', fontFamily:'Neon 80s'}}>Neon Coin</h1>
                <h2 style={{color:'white'}}>User mode</h2>
                <h1 style={{color:'cyan'}}>{this.props.account}</h1>
            </div>

        )

    }

}


