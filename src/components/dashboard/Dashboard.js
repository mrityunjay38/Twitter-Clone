import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "./tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
// import file from "../../firebaseConfig/storage";
import LeftSideBar from "../sidebars/LeftSidebar";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export default class Dashboard extends Component {

  state = {
    isSignedIn: false,
    user : {},
    tweets: []
  };

  async componentDidMount() {
    const user = fire.auth().currentUser;
    if(user){
      const username = user.displayName.split('|');
      console.log(user.uid);
      this.setState({
        user : {
          uid : user.uid,
          name : username[0],
          username: username[1]
        }
      });

      // tweets of followed users
      const followData = await db.collection('followers').where('follower_id', '==', user.uid).get();
      const followerIds = [];
      followData.docs.forEach( doc => followerIds.push(doc.data().userId));
      console.log(followerIds);

      followerIds.forEach( id => {
        db.collection('tweets').where('uid', '==', id).orderBy('time').get().then( snap => {
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

  addTweet = async (tweet,img) => {
 
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });
    
    if(tweet.img == ''){
      db.collection('tweets').add(tweet);
    }
    else{
      const storageRef = firebase.storage().ref('uploads/' + this.state.user.uid + '/tweets/' + img.name);
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
          <LeftSideBar user={user}/>
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
