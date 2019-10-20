import React, { Component } from "react";
import RespondToTweet from "./RespondToTweet";
import "../css/tweets.scss";
import moment from "moment";
import db from "../firebaseConfig/db";
import { Link } from "react-router-dom";

export default class Tweets extends Component {
  render() {
    return this.props.tweets.map(tweet => {
      // console.log(tweet.id);
      return (
        <article>
          {tweet.is_retweet ? (
            <div className="isRetweet">
              <span className="Icon Icon--retweet Icon--small" />
              <span>{tweet.who_retweeted} Retweeted</span>
            </div>
          ) : null}
          <img className="profile-pic" src={this.props.user.photoUrl} />
          <div className="tweets-container">
            <div className="user-credentials">
              <span className="name">{tweet.name}</span>
              <span className="username">@{tweet.username}</span>
              <span className="username">
                {moment(tweet.time.toDate()).fromNow()}
              </span>
            </div>
            <Link to={`/${tweet.username}/status/${tweet.id}`}>
              <div className="tweet-content">
                <p>{tweet.text}</p>
                <img src={tweet.img} />
              </div>
            </Link>
            <RespondToTweet
              tweet={tweet}
              openReplyModal={this.props.openReplyModal}
            />
          </div>
        </article>
      );
    });
  }
}
