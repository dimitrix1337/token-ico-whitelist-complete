import React, { Component } from "react";

export default class UserScreen extends Component {

    render () {


        return (

            <div className="App">
                <h1>INITIAL COIN OFFERRING FOR MTK TOKEN</h1>
                <h2>User mode</h2>
                You actual address: <h1>{this.props.account}</h1>
            </div>

        )

    }

}


