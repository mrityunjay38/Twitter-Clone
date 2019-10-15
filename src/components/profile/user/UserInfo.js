import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom"
import fire from '../../../firebaseConfig/config'

export class UserInfo extends Component {

    state = {
        isSignedIn: false 
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

        const { name, username, CreatedAt, Followers, Following, userPhoto } = this.props

        return (
            <div>
                <div className="user-profile-edit-tab-container">
                    <div className="profile-pic-edit-tab-container">
                        <img alt="User Profile Pic" src={userPhoto} />
                        <Link to={`/user/${this.state.userID}/settings`}>
                            <button className="btn edit-profile-btn direct-to-pop-up-btn">Edit Profile</button>
                        </Link>
                    </div>
                </div>
                <div className="user-details-area">
                    <h3 className="user-name-on-profile-page">{name}</h3>
                    <p className="users-choosen-name-as-username">@{username}</p>
                    <div className="joining-our-app-date-with-little-calender">
                        <svg viewBox="0 0 24 24" style={{ blockSize: '1rem' }}>
                            <g>
                                <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                                <circle cx="7.032" cy="8.75" r="1.285"></circle>
                                <circle cx="7.032" cy="13.156" r="1.285"></circle>
                                <circle cx="16.968" cy="8.75" r="1.285"></circle>
                                <circle cx="16.968" cy="13.156" r="1.285"></circle>
                                <circle cx="12" cy="8.75" r="1.285"></circle>
                                <circle cx="12" cy="13.156" r="1.285"></circle>
                                <circle cx="7.032" cy="17.486" r="1.285"></circle>
                                <circle cx="12" cy="17.486" r="1.285"></circle>
                            </g>
                        </svg> joined {CreatedAt}
                    </div>
                    <div className="follower-following-btns">
                        <Link to={`/user/${this.state.userID}/Followers`}>
                            <button className="btn-which-will-show-followers-follwing-users">{Followers.length} Followers</button>
                        </Link>
                        <Link to={`/user/${this.state.userID}/Following`}>
                            <button className="btn-which-will-show-followers-follwing-users">{Following.length} Following</button>
                        </Link>
                    </div>
                </div>
                <nav className="navigation-links-to-different-pages">
                    <Link to={`/user/${this.state.userID}`} >
                        <button className="btn-style-for-Tweets-link">
                            Tweets
                        </button>
                    </Link>
                    <Link to={`/user/${this.state.userID}/with_replies`} >
                        <button className="btn-style-for-Replies-link">
                            Tweets & Replies
                        </button>
                    </Link>
                    <Link to={`/user/${this.state.userID}/media`} >
                        <button className="btn-style-for-Media-link">
                            Media
                        </button>
                    </Link>
                    <Link to={`/user/${this.state.userID}/likes`} >
                        <button className="btn-style-for-Likes-link">
                            Likes
                        </button>
                    </Link>
                </nav>
            </div>
        )
    }
}

export default UserInfo
