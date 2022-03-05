import React, { Component } from "react";

export default class LoadingScreen extends Component {

    render() {

        return (
            <div style={{justifyContent:"center", alignItems:'center', alignSelf:'center'}}>
                <h1 style={{color:'blue', fontWeight: 'bold'}}>Loading...</h1>
            </div>
        )

    }

}