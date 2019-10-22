import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import UserArea from "./UserArea";
import Tweets from "../../components/tweets";
import LeftSidebar from "../sidebars/LeftSidebar";
import RightSidebar from "../sidebars/RightSidebar";
// import RepliedTweet from "../tweets/RepliedTweet";
// import UserMedia from "../media/UserMedia";
// import LikedTweets from "../tweets/LikedTweets";
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
      show: false,
      allTweets: [],
      TweetsAndReplies: [],
      Media: [],
      Likes: [],
      // urlPart : this.props
    };

    fire.auth().onAuthStateChanged(user => {
      let CreatedTime = user.metadata.creationTime.split(' ');
      this.setState({createdAt: CreatedTime[2] + ' ' + CreatedTime[3], middle: 'showProfile', sub: 'Tweets'});
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

    await db.collection('followers').where('follower_id', '==', this.state.user.userId).get().then( snap => {
      this.setState({ noOfFollowing: snap.docs.length });
      
    } );

    await db.collection('followers').where('userId', '==', this.state.user.userId).get().then( snap => {
      this.setState( { noOfFollowers: snap.docs.length } );
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

    let tweetIds = [];

    await db.collection('likes').where('userId', '==', this.state.user.userId).get().then(snap => {
      snap.docs.forEach(doc => tweetIds.push(doc.data().tweetId))
    });

    tweetIds.forEach(tweetId => {
      db.collection('tweets').doc(tweetId).get().then(doc => {
        this.setState({ Likes: [doc.data(), ...this.state.Likes] })
      })
    })

    this.setState({ 
      allTweets: this.state.tweets.filter(tweet => tweet.isReply !== true),
      TweetsAndReplies: this.state.tweets.filter(tweet => tweet.isReply === true),
      Media: this.state.tweets.filter(tweet => tweet.img !== '') 
    })

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

  addRepliedTweet = async (tweet,img) => {
    tweet.isReply = true;
    tweet['replyingTo'] = this.state.tweet.username;
    
    if(tweet.img == ''){
      let addTweetsRef = await db.collection('tweets').add(tweet)
      this.setState({ tweetId: addTweetsRef.id });
    }
    else{
      let storageRef = file.ref('uploads/' + tweet.uid + '/tweets/' + img.name);
      storageRef.put(img).then( async snap => {
        console.log(snap);
        let url = await storageRef.getDownloadURL()
        
        tweet.img = url;
        
        let addTweetsRef = await db.collection('tweets').add(tweet)
        this.setState({ tweetId: addTweetsRef.id });
        
      });
    }

    console.log(this.state.tweetId, this.state.tweet.id);

    let replies = {
      userId: tweet.uid,
      repliedTo: this.state.tweet.id,
      tweetId: this.state.tweetId  
    }

    db.collection('replies').add(replies);

    let replyCount = this.state.tweet.reply_count + 1 ;

    db.collection('tweet').doc(replies.repliedTo).update({reply_count: replyCount});
  };

  render() {
    
    const { allTweets, TweetsAndReplies, Media, Likes, show, tweet, user } = this.state;

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
                <Tweets user={user} tweets={allTweets} openReplyModal={this.openReplyModal}/>
              ) : ( this.state.sub === 'Replies' ? (
                <Tweets user={user} tweets={TweetsAndReplies} openReplyModal={this.openReplyModal}/>
                    ) : ( this.state.sub === 'Media' ? (
                      <Tweets user={user} tweets={Media} openReplyModal={this.openReplyModal}/>
                          ) : ( 
                          <Tweets user={user} tweets={Likes} openReplyModal={this.openReplyModal}/>
                           ) ) )}
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
              <Tweet user={user} newTweet={this.addRepliedTweet}/>
            </TweetAndReplyModal>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
