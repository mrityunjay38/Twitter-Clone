import React, { Component } from 'react'
import db from '../../firebaseConfig/db'
import fire from '../../firebaseConfig/config'
import file from '../../firebaseConfig/storage'
import moment from 'moment'
import LeftSidebar from '../sidebars/LeftSidebar'
import RightSidebar from '../sidebars/RightSidebar'
import RespondToTweet from '../RespondToTweet'
import TweetAndReplyModal from './TweetAndReplyModal'
import Tweet from '../dashboard/tweet'
import Tweets from '../tweets'

class DisplayTweets extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tweetId: this.props.match.params.id, 
            tweet: {},
            tweets: [],
            show: false,
            user: {}
        }

        fire.auth().onAuthStateChanged(user => {
            let name = user.displayName.split('|')
            this.setState({ name:name[0], username: name[1], userId: user.uid, user: user});
        })
    }

    async componentDidMount() {
        await db.collection('tweets').doc(this.state.tweetId).get().then(doc => {
            let tweet = doc.data();
            tweet.id = doc.id;
            tweet.time = tweet.time.toDate();
            this.setState({ tweet });
        })
        console.log(this.props.match.params);

        let tweetIds = [];

        await db.collection('replies').where('repliedTo', '==', this.state.tweetId).get().then(snap => {
            snap.docs.forEach(doc => {
                tweetIds.push(doc.data().tweetId);
            })
        })

        tweetIds.forEach(tweetId => {
            db.collection('tweets').doc(tweetId).get().then(doc => {
                let tweet = doc.data();
                tweet.id = doc.id;
                this.setState({ tweets : [tweet,...this.state.tweets] })
            })
        })
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
    
      };

    render() {

        const { user, tweets } = this.state;
        
        const {name, username, time, text, img, likes, retweet_count} = this.state.tweet;

        // const showHideClassName = this.state.show ? { display: 'block'} : {display: 'none'};

        // console.log(moment(time).format('LL'));
        
        return (
            <section className="dashboard">
                <div className="left-sidebar">
                    <LeftSidebar username={this.state.username}/>
                </div>
                <div className="middle">
                    <div className="single-tweet-display-header">
                        <h3>Tweets</h3>
                    </div>
                    <div className="single-tweet-user-credentials">
                        <span className="name">{name}</span>
                        <span className="username">@{username}</span>
                        {/* <span className="username">{moment(time.toDate())}</span> */}
                    </div>
                    <div className="single-tweet-content">
                        <p>{text}</p>
                        <div style={{padding: '1rem'}}>
                            <img src={img} style={{width: '100%', borderRadius: '1rem'}}/>

                        </div>
                        <p>{moment(time).fromNow()}</p>
                    </div>
                    <div className="single-tweet-counts">
                        <span>{likes} Likes</span>
                        <span>{retweet_count} Retweets</span>
                    </div>
                    <div>
                        <Tweets user={user} tweets={tweets} showTweet={this.showTweet} openReplyModal={this.openReplyModal}/>
                    </div>
                </div>
                <div className="right-sidebar">
                    <RightSidebar/>
                </div>
                <div>
                    {/* <TweetAndReplyModal 
                        showHideClassName={showHideClassName}
                        handleClose={this.handleClose}
                        tweet={this.state.tweet}
                    >
                        <Tweet user={this.state.user} newTweet={this.addRepliedTweet}/>
                    </TweetAndReplyModal> */}
          </div>
            </section>
        )
    }
}

export default DisplayTweets
