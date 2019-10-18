import React, { Component } from 'react';
import fire from "../firebaseConfig/config";
import db from "../firebaseConfig/db";
import "../css/respond-to-tweet.scss";

export default class RespondToTweet extends Component {

    state = {
        tweet : this.props.tweet,
        user : {}
    }

    componentDidMount () {
        const user = fire.auth().currentUser;
        if(user){
            this.setState({
                user : user
            });
        }
    }

    retweet = (e) => {
        e.preventDefault();
        console.log(this.state.tweet);
        console.log(this.state.user);

        const newRetweet = this.state.tweet;
        
        newRetweet.is_retweet = true;
        newRetweet.retweet_count = newRetweet.retweet_count + 1;
        newRetweet.uid = this.state.user.uid

        db.collection('tweets').add(newRetweet);

    }

    render(){
        return (
            <div className="respond-to-tweet">
            <span className="Icon Icon--reply Icon--medium"/>
            <span onClick={this.retweet} className="Icon Icon--retweet Icon--medium"/>
            <span className="Icon Icon--heart Icon--medium"/>
            </div>
        );
    }
}