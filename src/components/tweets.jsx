import React, { Component } from "react";
import RespondToTweet from "./RespondToTweet";
import "../css/tweets.scss";
import moment from "moment";
import db from "../firebaseConfig/db";

export default class Tweets extends Component {
  render() {
    return this.props.tweets.map(tweet => {
      console.log(tweet);
      return (
        <article>
          {tweet.is_retweet ? (
            <div className="isRetweet">
              <span className="Icon Icon--retweet Icon--small" />
              <span>{tweet.who_retweeted} Retweeted</span>
            </div>
          ) : null}
          <div className="user-credentials">
            <span className="name">{tweet.name}</span>
            <span className="username">@{tweet.username}</span>
            <span className="username">
              {moment(tweet.time.toDate()).fromNow()}
            </span>
          </div>
          <div className="tweet-content">
            <p>{tweet.text}</p>
            <img src={tweet.img} />
          </div>
          <RespondToTweet tweet={tweet} />
        </article>
      );
    });
  }
}
