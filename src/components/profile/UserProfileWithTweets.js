import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import UserArea from "./UserArea";
import Tweets from "../../components/tweets";
import LeftSidebar from "../sidebars/LeftSidebar";
import RightSideBar from "../sidebars/RightSideBar";



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
    }

    await db.collection('tweets').where('username', '==', this.props.match.params.id ).get().then( snap => {
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

    const { tweets } = this.state;

    return (
      <section className="profile-area">
        <div className="profile-area-container">
          <div className="left-sidebar">
            <LeftSidebar username={this.props.match.params.id}/>
          </div>
          <div className="middle">
            <UserArea user={this.state.user}/>
            <div>
            <Tweets tweets={tweets}/>

            </div>
          </div>
          <div className="trends-who-to-follow-area">
            <RightSideBar/>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
