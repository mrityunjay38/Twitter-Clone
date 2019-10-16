import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import UserArea from "./UserArea";
import DisplayTweets from "../tweets/DisplayTweets";
import LeftSidebar from "../sidebars/LeftSidebar";

class UserProfileWithTweets extends Component {
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
          <div className="left-sidebar">
            <LeftSidebar user={this.state.user}/>
          </div>
          <div className="user-area">
            <UserArea user={this.state.user} sub={this.state.sub} />
            <DisplayTweets />
          </div>
          <div className="trends-who-to-follow-area">
            <h1>Hello There will be Trends here in the future.</h1>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
