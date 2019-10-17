import React, { Component } from 'react';
import "../css/respond-to-tweet.scss";

export default class RespondToTweet extends Component {
    render(){
        return (
            <div className="respond-to-tweet">
            <span className="Icon Icon--reply Icon--medium"/>
            <span className="Icon Icon--retweet Icon--medium"/>
            <span className="Icon Icon--heart Icon--medium"/>
            </div>
        );
    }
}