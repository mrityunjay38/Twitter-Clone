import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../css/left-sidebar.scss";
import fire from "../../firebaseConfig/config";

export default class LeftSideBar extends Component {

    state = {
        userLoggedin : false
    }

    componentDidMount () {

        fire.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    userLoggedin: true
                });
            }
        });
    }

    render(){

        const { userLoggedin } = this.state;
        
        return (
            <div>
            <Link to="/">
            <span className="Icon Icon--bird Icon--extraLarge"/>
            </Link>
            <Link className="home-btn" to="/dashboard"><span className="Icon Icon--homeFilled Icon--extraLarge"/><span>Home</span></Link>
            <Link to={`/${this.props.username}`}><span className="Icon Icon--follower Icon--extraLarge"/><span>Profile</span></Link>
            {
                userLoggedin ? (
            <Link to="/" onClick={() => fire.auth().signOut()} className="logout">Logout</Link>
                ) : (
                    <Link to="/login" className="logout">Sign In</Link>
                )
            }
            </div>
        );
    }
}