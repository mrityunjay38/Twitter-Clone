import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import UserArea from "./UserArea";
import Tweets from "../../components/tweets";
import LeftSidebar from "../sidebars/LeftSidebar";


class UserProfileWithTweets extends Component {

  state = {
    isSignedIn: false,
    user : {},
    tweets: []
  };

  async componentDidMount() {
    const user = fire.auth().currentUser;
    
    if(user){
      
      const username = user.displayName.split('|');
      console.log(user);
      this.setState({
        user : {
          uid : user.uid,
          name : username[0],
          username: username[1]
        }
      });
      console.log(this.state);

      // particular user tweets
      
    }

    await db.collection('tweets').where('username', '==', this.props.match.params.id ).get().then( snap => {
      // console.log(snap.docs);
      snap.docs.forEach( doc => {
        console.log(doc.data());

        this.setState({
            tweets : [doc.data(),...this.state.tweets]
          })
        }
      );
    });
  }

  render() {
    // console.log(this.props.match.params)
    
    const { tweets } = this.state;

    return (
      <section className="profile-area">
        <div className="profile-area-container">
          <div className="left-sidebar">
            <LeftSidebar username={this.props.match.params.id}/>
          </div>
          <div className="middle">
            <UserArea />
            <div>
            <Tweets tweets={tweets}/>

            </div>
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
