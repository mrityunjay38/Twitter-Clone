import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../../css/left-sidebar.scss";
import fire from "../../firebaseConfig/config";
// import undefined from 'firebase/empty-import';

export default class LeftSideBar extends Component {

    // state = {
    //     // isSignedIn : false
    //     username: this.props.user.username
    // }

    // componentDidMount() {
    //     fire.auth().onAuthStateChanged(user => {
    //         this.setState({ isSignedIn: !!user ,userId : user.uid, name: name[0]})
    //         this.getAllUser();
    //         this.filteringUsers();
    //       })
    // }

    render(){
        
        return (
            <div>
            <span className="Icon Icon--bird Icon--extraLarge"/>
            <Link className="home-btn" to="/dashboard"><span className="Icon Icon--homeFilled Icon--extraLarge"/><span>Home</span></Link>
            <Link to={`/user/${this.props.username}`}>
                <span className="Icon Icon--follower Icon--extraLarge"/> 
                <span>
                    Profile
                </span>
            </Link>
            <Link to="/" onClick={() => fire.auth().signOut()} className="logout">Logout</Link>
            </div>
        );
    }
}