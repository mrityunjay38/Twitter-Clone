import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../css/left-sidebar.scss";
import fire from "../../firebaseConfig/config";

export default class LeftSideBar extends Component {
    render(){
        return (
            <div>
            <span class="Icon Icon--bird Icon--extraLarge"/>
            <Link className="home-btn" to="/dashboard"><span className="Icon Icon--homeFilled Icon--extraLarge"/><span>Home</span></Link>
            <Link to="/profile"><span className="Icon Icon--follower Icon--extraLarge"/><span>Profile</span></Link>
            <Link to="/" onClick={() => fire.auth().signOut()} className="logout">Logout</Link>
            </div>
        );
    }
}