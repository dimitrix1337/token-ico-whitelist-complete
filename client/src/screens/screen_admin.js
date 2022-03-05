import React, { Component } from "react";

export default class AdminScreen extends Component {


    render () {


        return (

            <div className="App">
                <h1>INITIAL COIN OFFERRING FOR MTK TOKEN</h1>
                <h2>admin mode</h2>
                <h2>THIS VIEW IS ONLY FOR ADMINS! YES YOU ARE ONE</h2>
                You actual address: <h1>{this.props.account}</h1>
                <button onClick={() => this.props.whitelist_function()}>CHANGE STATUS</button>
            </div>

        )

    }

}


