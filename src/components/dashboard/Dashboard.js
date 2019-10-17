import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "./tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import file from "../../firebaseConfig/storage";
import RightSideBar from "../sidebars/RightSideBar";
import LeftSideBar from "../sidebars/LeftSidebar";
import getFollowerData from '../../firebaseConfig/Queries'

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
      const followerIds = await getFollowerData.getFollowerData(user.uid);   
      
      console.log(followerIds);

      followerIds.forEach( id => {
        db.collection('tweets').where('uid', '==', id).orderBy('time').get().then( snap => {
          snap.docs.forEach( doc => this.setState({
            tweets : [doc.data(),...this.state.tweets]
          }));
        });
      });

    }
    else{
      this.props.history.push('/');
    }
  }

  addTweet = (tweet,img) => {
    console.log(this.state.user);
 
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });

    // console.log(tweet.img);
    
    if(tweet.img === ''){
      db.collection('tweets').add(tweet);
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
          <LeftSideBar username={this.state.user.username}/>
        </div>
        <div className="middle">
          <Tweet user={this.state.user} newTweet={this.addTweet} />
          <Tweets tweets={this.state.tweets} user={this.state.user}/>
        </div>
        <div className="right-sidebar">
          <RightSideBar/>
        </div>
      </section>
    );
  }
}
