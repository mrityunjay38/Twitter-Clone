import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "./tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import file from "../../firebaseConfig/storage";
import LeftSideBar from "../sidebars/LeftSidebars";

export default class Dashboard extends Component {

  state = {
    isSignedIn: false,
    user : {},
    tweets: []
  };

  componentDidMount() {
    const user = fire.auth().currentUser;
    if(user){
      console.log(user);
      this.setState({
        user : user
      });

      db.collection('tweets').get().then( snap => {
        snap.docs.forEach( doc => this.setState({
          tweets : [doc.data(),...this.state.tweets]
        }));
      });

    }
    else{
      this.props.history.push('/');
    }
  }

  addTweet = (tweet,img) => {
 
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });

    console.log(tweet.img);
    
    if(tweet.img == ''){
      db.collection('tweets').add(tweet);
    }
    else{
      const storageRef = file.ref('uploads/' + this.state.user.uid + '/tweets/' + img.name);
      storageRef.put(img);
      storageRef.getDownloadURL().then( url => {
        tweet.img = url;
        db.collection('tweets').add(tweet);
      });
    }

  };

  render() {
    const { user, tweets } = this.state;

    // console.log(tweets);

    return (
      <section className="dashboard">
        <div className="left-sidebar">
          <LeftSideBar/>
        </div>
        <div className="middle">
          <Tweet user={user} newTweet={this.addTweet} />
          <Tweets tweets={tweets} />
        </div>
        <div className="right-sidebar">
          <h1 style={{ color: "white" }}>Follow/Unfollow snippet</h1>
        </div>
      </section>
    );
  }
}
