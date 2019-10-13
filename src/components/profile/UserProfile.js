import React, { Component } from 'react'
import fire from '../../firebaseConfig/config'
import { Link } from 'react-router-dom'
import UserArea from './UserArea'

class UserProfile extends Component {

    state = {
        isSignedIn: false,
        user: {
            name: 'Ashish Padhi',
            username: 'Zodiac0606',
            Followers: [
                {
                    uid: 1,
                    name: 'Halo',
                    username: 'game_of_the_year',
                    userPhotoURL: 'https://i.redd.it/tqr6vf9i34l21.jpg'
                }
            ],
            Following: [
                {
                    uid: 3,
                    name: 'One Piece',
                    username: 'best_anime',
                    userPhotoURL: 'https://en.wikipedia.org/wiki/List_of_One_Piece_characters#/media/File:Main_characters_of_One_Piece.png'
                }
            ],
            userPhotoURL: 'https://i.pinimg.com/474x/41/bf/4b/41bf4b466baf974aa6b50cab301c77d9--scorpio-sign-tattoos-symbol-tattoos.jpg',
            likes: [
                {
                    tweetID: 1,
                    tweet: 'Hey, Its been a long time since I\'ve posted any new songs. So I\'ve just come up with a new song. plz like it.',
                    uid: 2,
                    username: 'SanjanaSinger007',
                    name: 'Sanjana Singh',
                    likes: 23,
                    reply: [
                        {
                            tweetID: 324,
                            tweet: 'abscskfbsdjkfb',
                            uid: 5,
                            username: 'qwerty12345',
                            name: 'keyboard',
                            likes: 453
                        }
                    ]
                }
            ],
            tweets: [
                {
                    tweetID: 1,
                    tweet: 'Hello Everyone!',
                    photoURL: 'https://wallpaperplay.com/walls/full/6/7/7/275271.jpg',
                    likes: 1297,
                    reply: [
                        {
                            tweetID: 324,
                            tweet: 'abscskfbsdjkfbafnajafjbafjsafjbdsfjkbdsjkb',
                            uid: 5,
                            username: 'qwerty12345',
                            name: 'keyboard',
                            likes: 4 
                        }
                    ]
                }
            ],
            headerPhotoURL: 'https://wallpaperplay.com/walls/full/f/c/d/275250.jpg',
            CreatedAt: 'March 2016'
        }
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
        console.log(this.state.user);
        return (
            <section className="profile-area">
            <div className="left-sidebar">
                <h1 style={{color: "white"}}>Tabs area</h1>
                <Link to="/dashboard">
                    <button>Home</button>
                </Link>
                <Link to={`/user/${this.state.user_id}`}>
                    <button>Profile</button>
                </Link>
                {/* <Link to={`/user/${this.state.user_id}/settings}`} >
                    <button>Settings</button>
                </Link> */}
                <Link to="/">
                    <button onClick={() => fire.auth().signOut()}>Log out!</button>
                </Link>
                <Link to={`/user/${this.state.user_id}/addTweet`}>
                    <button>Tweet</button>
                </Link>
            </div>
            <div className="user-area">
                <UserArea user={this.state.user}/>
            </div>
            <div className="trends-who-to-follow-area">
                
            </div>

            </section>
        )
    }
}

export default UserProfile
