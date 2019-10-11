import React, { Component } from 'react';
import "../../css/dashboard.scss";
import Tweet from "../dashboard/tweet";

export default class Dashboard extends Component {
    render(){
        return (
            <section className="dashboard">
            <div className="left-sidebar"></div>
            <div className="middle">
            <Tweet/>
            </div>
            <div className="right-sidebar"></div>
            </section>
        );
    }
}