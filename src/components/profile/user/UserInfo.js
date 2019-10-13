import React, { Component } from 'react'
import { Link } from "react-router-dom"
import fire from '../../../firebaseConfig/config'

export class UserInfo extends Component {

    state = {
        isSignedIn: false 
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
            console.log(user);
        this.setState({ isSignedIn: !!user, userID: user.uid })
        if(user == null) {
        }
        console.log(this.props.history)
        })
    }

    render() {
        console.log(this.props);

        const { name, username, CreatedAt, Followers, Following, userPhoto } = this.props

        return (
            <div>
                <div>
                    <img alt="User Profile Pic" src={userPhoto} />
                    <Link to={`/user/${this.state.userID}/settings`}>
                        <button>Edit Profile</button>
                    </Link>
                </div>
                <div>
                    <h3>{name}</h3>
                    <p>@{username}</p>
                    <div>
                        <svg viewBox="0 0 24 24" className="little-calender" style={{ blockSize: '1rem' }}>
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
                    <div>
                        <Link to={`/user/${this.state.userID}/Followers`}>
                            <button>{Followers.length} Followers</button>
                        </Link>
                        <Link to={`/user/${this.state.userID}/Following`}>
                            <button>{Following.length} Following</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo
