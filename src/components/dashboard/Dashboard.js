import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "./tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import file from "../../firebaseConfig/storage";
import LeftSideBar from "../sidebars/LeftSidebar";

export default class Dashboard extends Component {

  state = {
    isSignedIn: false,
    user : {},
    tweets: []
  };

  async componentDidMount() {
    const user = fire.auth().currentUser;
    if(user){
      let userName = user.displayName.split('|');
      console.log(user.uid);
      this.setState({
        user: {
          userId : user.uid,
          name: userName[0],
          username: userName[1]}
      });

      const followData = await db.collection('followers').where('follower_id', '==', user.uid).get();
      const followerIds = [];
      followData.docs.forEach( doc => followerIds.push(doc.data().userId));
      console.log(followerIds);

      // tweets of followed users
      followerIds.forEach( id => {
        db.collection('tweets').where('uid', '==', id).get().then( snap => {
          snap.docs.forEach( doc => this.setState({
            tweets : [doc.data(),...this.state.tweets]
          }));
        });
      });

      // particular user tweets
      // db.collection('tweets').where('uid', '==', user.uid ).get().then( snap => {
      //   snap.docs.forEach( doc => this.setState({
      //     tweets : [doc.data(),...this.state.tweets]
      //   }));
      // });

    }
    else{
      this.props.history.push('/');
    }
  }

  addTweet = (tweet,img) => {
 
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });

    
    // let docRef = db.collection('tweets')

    console.log(tweet.img);
    
    if(tweet.img == ''){
      db.collection('tweets').doc().set(tweet)
      // db.collection('tweets')
    }
    else{
      const storageRef = file.ref('uploads/' + this.state.user.uid + '/tweets/' + img.name);
      storageRef.put(img);
      storageRef.getDownloadURL().then( url => {
        tweet.img = url;
        db.collection('tweets').doc().set(tweet)
      });
    }

  };

  render() {


    return (
      <section className="dashboard">
        <div className="left-sidebar">
          <LeftSideBar user={this.state.user}/>
        </div>
        <div className="middle">
          <Tweet user={this.state.user} newTweet={this.addTweet} />
          <Tweets tweets={this.state.tweets} />
        </div>
        <div className="right-sidebar">
          <h1 style={{ color: "white" }}>Follow/Unfollow snippet</h1>
        </div>
      </section>
    );
  }
}
