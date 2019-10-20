import React, { Component } from 'react';
import fire from "../firebaseConfig/config";
import db from "../firebaseConfig/db";
import "../css/respond-to-tweet.scss";

export default class RespondToTweet extends Component {

    state = {
        tweet : {},
        user : {},
        key : "",
        retweetId: "" 
    }

    componentDidMount () {
        const user = fire.auth().currentUser;
        if(user)
        this.setState({user : user, key : Math.random()});
    }

    addRetweet = (tweet) => {
        const retweetInfo = {
            tweetId : tweet.id,
            userId : this.state.user.uid
        }

        let isRetweeted = false;
        let retweetCollectionId = "";

        db.collection('retweets').where('tweetId', '==', tweet.id).where('userId', '==', tweet.uid).get().then( snap => {
            console.log(snap);

            if(snap.docs.length > 0){
                isRetweeted = true;
                retweetCollectionId = snap.docs[0].id;
            }

            if(isRetweeted){
                db.collection('retweets').doc(retweetCollectionId).delete().then( snap => {
                    tweet.retweet_count -= 1;
                    console.log('-');
                    console.log(tweet.retweet_count);
                    db.collection('tweets').doc(tweet.id).update({
                        retweet_count : tweet.retweet_count
                    });
                    db.collection('tweets').doc(this.state.retweetId).delete();
                    console.log(`who ${this.state.user.uid}`);
                    console.log(`id ${tweet.id}`);
                    this.setState({
                        key : Math.random()
                    });
                });
            }
            else{
                db.collection('retweets').add(retweetInfo).then( snap => {
                    console.log(tweet.retweet_count);
                    tweet.retweet_count += 1;
                    console.log('+');
                    console.log(tweet.retweet_count);
                    db.collection('tweets').doc(tweet.id).update({
                        retweet_count : tweet.retweet_count
                    });
                    db.collection('tweets').add(tweet).then( snapshot => {
                        console.log(snapshot);
                        this.setState({
                            retweetId : snapshot.id
                        });
                    });
                    this.setState({
                        key : Math.random()
                    });
                });
            }

        });

        // db.collection('tweets').add(tweet);

    }


    retweet = () => {

        console.log(this.props.tweet);

        this.setState({
            tweet : this.props.tweet
        }, () => {

        const newRetweet = this.state.tweet;
        // delete newRetweet.retweet_count;

        let userName = this.state.user.displayName.split('|')[0];
        
        newRetweet.is_retweet = true;
        newRetweet['who_retweeted'] = userName;
        newRetweet.uid = this.state.user.uid
        console.log(newRetweet);

        this.addRetweet(newRetweet);
        
        });

    }

    render(){

        const { reply_count, retweet_count, likes} = this.props.tweet;
        const { key } = this.state;

        return (
            <div className="respond-to-tweet">
            <div className={reply_count > 0 ? "hasReplies" : ""}>
            <span  className={reply_count > 0 ? "Icon Icon--circleReply Icon--medium" : "Icon Icon--reply Icon--medium"}/>
            <span>{reply_count}</span>
            </div>
            <div className={retweet_count > 0 ? "hasRetweets" : ""}>
            <span key={key} onClick={this.retweet} className={retweet_count > 0 ? "Icon Icon--retweeted Icon--medium" : "Icon Icon--retweet Icon--medium"}/>
            <span>{retweet_count}</span>
            </div>
            <div className={likes > 0 ? "hasLikes" : ""}>
            <span  className={likes > 0 ? "Icon Icon--heartBadge Icon--medium" : "Icon Icon--heart Icon--medium"}/>
            <span>{likes}</span>
            </div>
            </div>
        );
    }
}