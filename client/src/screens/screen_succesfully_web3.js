import React, { Component } from "react";

export default class SuccessfullyScreen extends Component {

    render() {

        return (
            <div style={{justifyContent:"center", alignItems:'center', alignSelf:'center'}}>
                <h1 style={{color:'red', fontWeight: 'bold'}}>Transaction completed succesfully!</h1>
            </div>
        )

    }

}