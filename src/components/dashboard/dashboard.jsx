import React, { Component } from 'react';
import "../../css/dashboard.scss";
import Tweet from "../dashboard/tweet";
import Tweets from "../tweets";

export default class Dashboard extends Component {
    render(){
        return (
            <section className="dashboard">
            <div className="left-sidebar"><h1 style={{color: "white"}}>Profile area</h1></div>
            <div className="middle">
            <Tweet/>
            {/* <h1 style={{color: "white"}}>Tweet + Feeds area</h1> */}
            <Tweets/>
            </div>
            <div className="right-sidebar"><h1 style={{color: "white"}}>Follow/Unfollow snippet</h1></div>
            </section>
        );
    }
}