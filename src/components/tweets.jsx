import React, { Component } from "react";
import "../css/tweets.scss";
import moment from "moment";

export default class Tweets extends Component {

  render() {

    return this.props.tweets.map(tweet => {
      console.log(tweet.time);
      return (<article>
        <div className="user-credentials">
          <span className="name">{tweet.name}</span>
          <span className="username">@{tweet.username}</span>
          <span className='username'>{moment(tweet.time.toDate()).fromNow()}</span>
        </div>
        <div className="tweet-content">
          <p>{tweet.text}</p>
          <img src={tweet.img} />
        </div>
        <div className="tweet-options">
          <p onClick={this.props.addLikes.bind(this,tweet)}>Like</p> {tweet.likes}
        </div>
      </article>)
    });
  }
}
