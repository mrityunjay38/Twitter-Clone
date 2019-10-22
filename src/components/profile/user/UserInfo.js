import React, { Component } from 'react'
import { Link } from "react-router-dom"
import fire from '../../../firebaseConfig/config'

export class UserInfo extends Component {


    state = {
        userLoggedIn: false
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
            this.setState({
                userLoggedIn: true,
                userID: user.uid
            })
        })
    }

    render() {

        const { user, noOfFollowing, noOfFollowers, createdAt } = this.props;
        const { userLoggedIn } = this.state;

        return (
            <div>
                <div className="user-profile-edit-tab-container">
                    <div className="profile-pic-edit-tab-container">
                        <img src={user.photoURL}/>
                        {
                            userLoggedIn ? (
                            <Link to={`/settings/${user.username}/profile`}>
                                <button className="btn edit-profile-btn direct-to-pop-up-btn">Edit Profile</button>
                            </Link>
                            ) : null
                        }
                    </div>
                </div>
                <div className="user-details-area">
                    <h3 className="user-name-on-profile-page">{user.name}</h3>
                    <p className="users-choosen-name-as-username">@{user.username}</p>
                    <div style={{ color: 'white' }}>
                        <p>{user.bio}</p>
                    </div>
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
                        </svg> joined {createdAt}
                    </div>
                    <div className="follower-following-btns">
                        <Link to={`/${user.username}/follower`}>
                            <button className="btn-which-will-show-followers-follwing-users">{noOfFollowers} Followers</button>
                        </Link>
                        <Link to={`/${user.username}/following`}>
                            <button className="btn-which-will-show-followers-follwing-users">{noOfFollowing} Following</button>
                        </Link>
                    </div>
                </div>
                <nav className="navigation-links-to-different-pages">
                    <Link to={`/${user.username}`} >
                        <button className="btn-style-for-Tweets-link" onClick={this.props.handleChange.bind(this, "tweet")}>
                            Tweets
                        </button>
                    </Link>
                    <Link to={`/${user.username}/with_replies`} >
                        <button className="btn-style-for-Replies-link" onClick={this.props.handleChange.bind(this, "reply")}>
                            Tweets & Replies
                        </button>
                    </Link>
                    <Link to={`/${user.username}/media`} >
                        <button className="btn-style-for-Media-link" onClick={this.props.handleChange.bind(this, 'media')}>
                            Media
                        </button>
                    </Link>
                    <Link to={`/${user.username}/likes`} >
                        <button className="btn-style-for-Likes-link" onClick={this.props.handleChange.bind(this, 'like')}>
                            Likes
                        </button>
                    </Link>
                </nav>
            </div>
        )
    }
}

export default UserInfo
