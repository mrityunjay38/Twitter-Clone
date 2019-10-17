import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../css/left-sidebar.scss";
import fire from "../../firebaseConfig/config";

export default class LeftSideBar extends Component {
    constructor(props){
        super(props)
        fire.auth().onAuthStateChanged(user => {
                         let name = user.displayName.split('|')[1]
                         console.log("calling : ", name)
                         this.setState({ isSignedIn: !!user ,userId : user.uid, username: name,db:fire.firestore()})
                     })
    }

    render(){
        return (
            <div>
            <span className="Icon Icon--bird Icon--extraLarge"/>
            <Link className="home-btn" to="/dashboard"><span className="Icon Icon--homeFilled Icon--extraLarge"/><span>Home</span></Link>
            <Link className="profile-btn" to={`/name}/following`}>
                    <span className="Icon Icon--follower Icon--extraLarge"/>
                    <span>Followings</span>
                </Link>
                <Link className="profile-btn" to={`/name}/following`}>
                    <span className="Icon Icon--follower Icon--extraLarge"/>
                    <span>Followers</span>
                </Link>
            <Link to="/user/undefined"><span className="Icon Icon--follower Icon--extraLarge"/><span>Profile</span></Link>
            <Link to="/" onClick={() => fire.auth().signOut()} className="logout">Logout</Link>
            </div>
        );
    }
}