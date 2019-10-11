import React, { Component } from 'react';
import "../../css/dashboard.scss";
import Tweet from "../dashboard/tweet";

export default class Dashboard extends Component {
    render(){
        return (
            <section className="dashboard">
            <div className="left-sidebar"><h1 style={{color: "white"}}>Profile options</h1></div>
            <div className="middle">
            <h1 style={{color: "white"}}>Tweet Box</h1>
            {/* <Tweet/> */}
            </div>
            <div className="right-sidebar"><h1 style={{color: "white"}}>Follow box</h1></div>
            </section>
        );
    }
}