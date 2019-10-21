import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "./tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import file from "../../firebaseConfig/storage";
import LeftSidebar from "../sidebars/LeftSidebar";
import RightSidebar from "../sidebars/RightSidebar"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import TweetAndReplyModal from '../tweets/TweetAndReplyModal'

export default class Dashboard extends Component {

  state = {
    isSignedIn: false,
    user : {},
    tweets: [],
    show: false
  };

  async componentDidMount() {
    const user = fire.auth().currentUser;
    if(user){
      const username = user.displayName.split('|');
      console.log(user);
      this.setState({
        user : {
          userId : user.uid,
          name : username[0],
          username: username[1],
          photoURL : user.photoURL
        }
      });

      // tweets of followed users
      const followData = await db.collection('followers').where('follower_id', '==', user.uid).get();
      const followerIds = [];
      followData.docs.forEach( doc => followerIds.push(doc.data().userId));
      console.log(followerIds);

      
      followerIds.forEach( id => {
        db.collection('tweets').where('uid', '==', id).orderBy('time').get().then( snap => {
          snap.docs.forEach( doc => {
            let tweet = doc.data();
            tweet.id = doc.id;
            this.setState({
            tweets : [tweet,...this.state.tweets]
          })});
        });
      });

    }
    else{
      this.props.history.push('/');
    }
  }

  addTweet = (tweet,img) => {
    // console.log(this.state)
 
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });
    
    if(tweet.img == ''){
      db.collection('tweets').add(tweet);
    }
    else{
      let storageRef = file.ref('uploads/' + this.state.user.userId + '/tweets/' + img.name);
      storageRef.put(img).then( snap => {
        console.log(snap);
        storageRef.getDownloadURL().then( url => {
          tweet.img = url;
          db.collection('tweets').add(tweet);
        });
      });
    }

  };

  addRepliedTweet = async (tweet, img) => {
    tweet.isReply = true;
    tweet['replyingTo'] = this.state.tweet.username;
    
    if(tweet.img == ''){
      db.collection('tweets').add(tweet).then(ref => {
        this.setState({ tweetId: ref.id });
        let replies = {
          userId: tweet.uid,
          repliedTo: this.state.tweet.id,
          tweetId: this.state.tweetId  
        }
    
        db.collection('replies').add(replies);
      })
    }
    else{
      let storageRef = file.ref('uploads/' + tweet.uid + '/tweets/' + img.name);
      storageRef.put(img).then(snap => {
        storageRef.getDownloadURL().then(url => {
          tweet.img = url;
          db.collection('tweets').add(tweet).then(ref => {
            this.setState({ tweetId: ref.id });

            let replies = {
              userId: tweet.uid,
              repliedTo: this.state.tweet.id,
              tweetId: this.state.tweetId  
            }
        
            db.collection('replies').add(replies);

          })
        })
      }) 
    }

    let replyCount = this.state.tweet.reply_count + 1 ;

    db.collection('tweets').doc(this.state.tweet.id).update({reply_count: replyCount});

    this.setState({ show: false });
  }

  showTweet = (id) => {
    console.log(id)
  }

  openReplyModal = (tweet) => {
    // console.log(id);
    this.setState({show: true, tweet});
  }

  handleClose = () => {
    // this.props.history.pop();
    this.setState({ show: false })
  }

  render() {
    const { user, tweets, tweet, show } = this.state;
    
    const showHideClassName = show ? { display: 'block'} : {display: 'none'};

    console.log(user);

    return (
      <section className="dashboard">
        <div className="left-sidebar">
          <LeftSidebar username={user.username}/>
        </div>
        <div className="middle">
          <div style={{ padding: '1rem', color: 'white', fontSize: 'large' }}>
            <span>Home</span>
          </div>
          <hr style={{ width: '100%', border: '0.02rem solid rgba(114, 173, 212, 0.3)' }}/>
          <Tweet user={user} newTweet={this.addTweet} />
          <Tweets user={user} tweets={tweets} showTweet={this.showTweet} openReplyModal={this.openReplyModal}/>
        </div>
        <div className="right-sidebar">
          {/* <h1 style={{ color: "white" }}>Follow/Unfollow snippet</h1> */}
          <RightSidebar/>
        </div>
        <div>
            <TweetAndReplyModal 
              showHideClassName={showHideClassName}
              handleClose={this.handleClose}
              tweet={tweet}
            >
              <Tweet user={user} newTweet={this.addRepliedTweet}/>
            </TweetAndReplyModal>
          </div>
      </section>
    );
  }
}
