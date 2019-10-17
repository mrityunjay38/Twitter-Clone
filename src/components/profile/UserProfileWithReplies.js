import React, { Component } from 'react'
import fire from '../../firebaseConfig/config'
import UserArea from './UserArea'
import RepliedTweet from '../tweets/RepliedTweet'
import LeftSidebar from '../sidebars/LeftSidebar'
import RightSideBar from '../sidebars/RightSideBar'


class UserProfileWithReplies extends Component {

    state = {
        isSignedIn: false,
        user: {},
        sub: 'P'
      };
    
      componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
          // console.log(user);
          this.setState({ isSignedIn: !!user});
          if(user){
            let userName = user.displayName.split('|');
            console.log(user.uid);
            this.setState({
              user: {
                userId : user.uid,
                name: userName[0],
                username: userName[1]
              }
            });
          }
      });
    
    }

    render() {
        // console.log(this.state.user);
        return (
            <section className="profile-area">
                <div className="profile-area-container">
                <LeftSidebar username={this.state.user.username}/>
                <div className="user-area">
                    <h1>Hello</h1>
                    {/* <UserArea user={this.state.user} sub={this.state.sub}/>
                    <RepliedTweet /> */}
                </div>
                <div className="trends-who-to-follow-area">
                <RightSideBar/>
                </div>

                </div>
            </section>
        )
    }
}

export default UserProfileWithReplies
