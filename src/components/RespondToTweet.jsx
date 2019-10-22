import React, { Component } from 'react';
import fire from "../firebaseConfig/config";
import db from "../firebaseConfig/db";
import "../css/respond-to-tweet.scss";

export default class RespondToTweet extends Component {

    state = {
        tweet : {},
        user : {},
        key : "",
        retweetId: "",
        clickCount: 0,
        likesClickedCount : 0,
        isRetweeted : false
    }

    componentDidMount () {
        const user = fire.auth().currentUser;
        if(user)
        this.setState({user : user, key : Math.random()});
    }

    addRetweet = (tweet) => {

        const { clickCount } = this.state;

        const retweetInfo = {
            tweetId : tweet.id,
            userId : this.state.user.uid
        }

        let currRetweetCount = tweet.retweet_count;
        let isRetweeted = false;
        let retweetCollectionId = "";

        db.collection('retweets').where('tweetId', '==', tweet.id).where('userId', '==', tweet.uid).get().then( snap => {
            console.log(snap);

            if(snap.docs.length > 0){
                isRetweeted = true;
                retweetCollectionId = snap.docs[0].id;
                this.setState({
                    isRetweeted : true
                });
            }
            else {
                this.setState({
                    isRetweeted : false
                });
            }

            if(isRetweeted){
                db.collection('retweets').doc(retweetCollectionId).delete().then( snap => {
                   
                    if((tweet.retweet_count - 1) >= 0 && (tweet.retweet_count === currRetweetCount - 1)){
                        tweet.retweet_count -= 1;
                        db.collection('tweets').doc(tweet.id).update({
                            retweet_count : tweet.retweet_count
                        });
                    }
                    else {
                        if(currRetweetCount -1 >= 0){
                            tweet.retweet_count = currRetweetCount - 1;
                        }
                        else {
                            tweet.retweet_count = 0;
                        }
                        db.collection('tweets').doc(tweet.id).update({
                            retweet_count : tweet.retweet_count
                        });
                    }

                    db.collection('tweets').doc(this.state.retweetId).delete();
                    console.log(`who ${this.state.user.uid}`);
                    console.log(`id ${tweet.id}`);
                    this.setState({
                        key : Math.random()
                    });
                });
            }
            else if((clickCount & 1) == 1 && isRetweeted == false){
                db.collection('retweets').add(retweetInfo).then( snap => {
                    
                    if((tweet.retweet_count + 1) === currRetweetCount + 1){
                        tweet.retweet_count += 1;
                        db.collection('tweets').doc(tweet.id).update({
                            retweet_count : tweet.retweet_count
                        });
                        this.setState({
                            retweetId : snap.id
                        });
                    }
                    else {
                        tweet.retweet_count = currRetweetCount + 1;
                        db.collection('tweets').doc(tweet.id).update({
                            retweet_count : tweet.retweet_count
                        });
                        this.setState({
                            retweetId : snap.id
                        });
                    }
                    
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

        const { clickCount} = this.state;

        this.setState({
            tweet : this.props.tweet,
            clickCount : clickCount + 1
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


        // __________________________________End Adding Likes______________________________________________//
        likes = () => {
            this.setState({
                tweet : this.props.tweet,
                likesClickedCount : this.state.likesClickedCount + 1
            }, () => {
            this.addLikes(this.state.tweet);
            });
    }

      addLikes = (tweet) => {
          let currentLike = tweet.likes;
        console.log("currentLike : ", currentLike)
        const { likesClickedCount } = this.state;
        const likeObj = {
            tweetId : tweet.id,
            userId : this.state.user.uid
        }

        let isLiked = false;
        let likesCollectionId = "";

        db.collection('likes').where('tweetId', '==', tweet.id).where('userId', '==', likeObj.userId).get().then( snap => {
         if(snap.size > 0){
                console.log('docs is not empty in likes collection');
                isLiked = true;
                likesCollectionId = snap.docs[0].id;
                this.setState({
                    isLiked : true
                });
            }
            else{
                this.setState({isLiked : false});
            }

            if(isLiked){
               db.collection('likes').doc(likesCollectionId).delete();
                if((tweet.likes -1) >= 0) {
                    if((tweet.likes -1) === currentLike -1){
                        tweet.likes -= 1;
                        console.log("Sub likes : ", tweet.likes)
                        db.collection('tweets').doc(tweet.id).update({
                            likes : tweet.likes
                        });
                    } else {
                        if((currentLike -1) >= 0) {
                        tweet.likes = currentLike -1;
                        } else {
                            tweet.likes = 0;
                        }
                        console.log("Sub likes : ", tweet.likes)
                        db.collection('tweets').doc(tweet.id).update({
                            likes : tweet.likes
                        });
                    }
                } else {
                    tweet.likes = 0;
                }
               
                tweet.styleClassName = "Icon Icon--heart Icon--medium";
                if((likesClickedCount & 1) == 0){
                    this.setState({
                        key : Math.random()
                    });
                }
            }
            else if((likesClickedCount & 1) == 1 && isLiked == false) {
                    db.collection('likes').add(likeObj).then( snap => {
                        if((tweet.likes +1) === currentLike +1){
                                tweet.likes += 1;
                                console.log("Add likes : ", tweet.likes)

                                tweet.styleClassName = "heart";
                                db.collection('tweets').doc(tweet.id).update({
                                    likes : tweet.likes
                                });
                                this.setState({
                                    likeId : snap.id
                                });
                        } else {
                            tweet.likes = currentLike +1;
                            console.log("Add likes : ", tweet.likes)

                            tweet.styleClassName = "heart";
                            db.collection('tweets').doc(tweet.id).update({
                                likes : tweet.likes
                            });
                            this.setState({
                                likeId : snap.id
                            });
                        }
                            if((likesClickedCount & 1) == 1){
                                this.setState({
                                    key : Math.random()
                                });
                            }
                        });
                    }
    })
}
// __________________________________End Adding Likes______________________________________________//



    render(){

        const { reply_count, retweet_count, likes} = this.props.tweet;
        const { key } = this.state;

        return (
            <div className="respond-to-tweet">
            <div className={reply_count > 0 ? "hasReplies" : ""}>
            <span onClick={this.props.openReplyModal.bind(this, this.props.tweet)} className={reply_count > 0 ? "Icon Icon--circleReply Icon--medium" : "Icon Icon--reply Icon--medium"}/>
            <span>{reply_count}</span>
            </div>
            <div className={retweet_count > 0 ? "hasRetweets" : ""}>
            <span key={key} onClick={this.retweet} className={retweet_count > 0 ? "Icon Icon--retweeted Icon--medium" : "Icon Icon--retweet Icon--medium"}/>
            <span>{retweet_count}</span>
            </div>
            <div className={likes > 0 ? "hasLikes" : ""}>
            <span onClick={this.likes} className={likes > 0 ? "Icon Icon--heartBadge Icon--medium" : "Icon Icon--heart Icon--medium"}/>
            <span>{likes}</span>
            </div>
            </div>
        );
    }
}