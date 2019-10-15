import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fire from '../../firebaseConfig/config'
import "../../css/left-sidebar.scss"

export class LeftSidebars extends Component {

    state = {
        isSignedIn: false,
        userID: null
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
            // console.log(user);
        this.setState({ isSignedIn: !!user, userID: user.uid })
        if(user == null) {
        }
        // console.log(this.props.history)
        })
    }

    render() {
        return (
            <div className="left-sidebar">
                <span className="Icon Icon--bird Icon--extraLarge"/>
                <Link className="home-btn" to="/dashboard">
                    <span className="Icon Icon--homeFilled Icon--extraLarge"/>
                    <span>Home</span>
                </Link>
                <Link className="profile-btn" to={`/user/${this.state.user}`}>
                    <span className="Icon Icon--follower Icon--extraLarge"/>
                    <span>Profile</span>
                </Link>
                <Link className="log-out-btn" to="/">
                    <span onClick={() => fire.auth().signOut()}>Log out!</span>
                </Link>
            </div>
        )
    }
}

export default LeftSidebars
