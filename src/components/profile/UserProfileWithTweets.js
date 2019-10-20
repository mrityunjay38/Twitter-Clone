import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import UserArea from "./UserArea";
import Tweets from "../../components/tweets";
import LeftSidebar from "../sidebars/LeftSidebar";
import RightSidebar from "../sidebars/RightSidebar";
import RepliedTweet from "../tweets/RepliedTweet";
import UserMedia from "../media/UserMedia";
import LikedTweets from "../tweets/LikedTweets";
import TweetAndReplyModal from "../tweets/TweetAndReplyModal";
import Tweet from '../dashboard/tweet'
import file from '../../firebaseConfig/storage'

class UserProfileWithTweets extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isSignedIn: false,
      user : {},
      loggedInUser: {},
      tweets: [],
      noOfFollowing: 0,
      noOfFollowers: 0, 
      sub: '',
      show: false
    };

    fire.auth().onAuthStateChanged(user => {
      let CreatedTime = user.metadata.creationTime.split(' ');
      this.setState({createdAt: CreatedTime[2] + ' ' + CreatedTime[3], sub: 'Tweets', middle: 'showProfile'})
  })
  }
  

  async componentDidMount() {
    const user = fire.auth().currentUser;
    if(user){
      const username = user.displayName.split('|');
      console.log(user.uid);
      this.setState({
        loggedInUser : {
          uid : user.uid,
          name : username[0],
          username: username[1]
        }, isSignedIn: true
      });
    }

    await db.collection('users').where('username', '==', this.props.match.params.id ).get().then( snap => {
      snap.docs.forEach( doc => {
        console.log(doc.data())
        this.setState( { user: doc.data() } );
      } )
    } )

    await db.collection('tweets').where('uid', '==', this.state.user.userId ).orderBy('time').get().then( snap => {
      snap.docs.forEach( doc => {
        // console.log(doc.id);
        let tweet = doc.data();
        tweet.id = doc.id;
        // console.log(doc.data());

        this.setState({
            tweets : [tweet,...this.state.tweets]
          })
        }
      );
    });

    await db.collection('followers').where('follower_id', '==', this.state.user.userId).get().then( snap => {
      this.setState({ noOfFollowing: snap.docs.length });
      
    } );

    await db.collection('followers').where('userId', '==', this.state.user.userId).get().then( snap => {
      this.setState( { noOfFollowers: snap.docs.length } );
    } )
  }

  handleChange = (sub) => {
    switch (sub) {
      case 'tweet':
        this.setState({ sub: 'Tweets' })
        break;

      case 'reply': 
        this.setState({ sub: 'Replies' })
        break;

      case 'media':
        this.setState({sub: 'Media'})
        break;

      case 'like':
        this.setState({sub: 'Likes'})
        break;
    
      default:
        break;
    }
    // console.log(this.props.match.url);
  }

  openReplyModal = (tweet) => {
    // console.log(id);
    this.setState({show: true, tweet});
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  addTweet = (tweet,img) => {
    // console.log(this.state)
    tweet.isReply = true;
    console.log(tweet, img);
 
    // this.setState({
    //   tweets: [tweet,...this.state.tweets]
    // });
    
    if(tweet.img == ''){
      db.collection('tweets').add(tweet);
    }
    else{
      let storageRef = file.ref('uploads/' + tweet.uid + '/tweets/' + img.name);
      storageRef.put(img).then( snap => {
        console.log(snap);
        storageRef.getDownloadURL().then( url => {
          tweet.img = url;
          db.collection('tweets').add(tweet);
        });
      });
    }

  };

  render() {
    
    const { tweets, show, tweet, user } = this.state;

    const showHideClassName = show ? { display: 'block'} : {display: 'none'};

    return (
      <section className="profile-area">
        <div className="profile-area-container">
          <div className="left-sidebar">
            <LeftSidebar username={this.props.match.params.id}/>
          </div>
          <div className="middle">
            <div>
            <UserArea 
              state={this.state} 
              isSignedIn={this.state.isSignedIn}
              handleChange={this.handleChange}
            />
            <div>
              {this.state.sub === 'Tweets' ? (
                <Tweets user={user} tweets={tweets} openReplyModal={this.openReplyModal}/>
              ) : ( this.state.sub === 'Replies' ? (
                      <RepliedTweet />
                    ) : ( this.state.sub === 'Media' ? (
                            <UserMedia />
                          ) : ( <LikedTweets /> ) ) )}
            </div>
            </div>
          </div>
          <div className="right-sidebar">
            <RightSidebar />
          </div>
          <div>
            <TweetAndReplyModal 
              showHideClassName={showHideClassName}
              handleClose={this.handleClose}
              tweet={tweet}
            >
              <Tweet user={user} newTweet={this.addTweet}/>
            </TweetAndReplyModal>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
