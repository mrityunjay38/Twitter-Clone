import React, { Component } from "react";
import "../css/tweets.scss";

export default class Tweets extends Component {
  // sample state

  // state = {
  //     username : "godlevel",
  //     name : "Xyz",
  //     content : {
  //         text : "Isn't it kinda cold up here?",
  //         img : "https://purewows3.imgix.net/images/articles/2018_06/the_night_king_game_of_thrones.jpg"
  //     }
  // }

  render() {
    // const {name,username,content} = this.state;

    return this.props.tweets.map(tweet => {
      return (<article>
        <div className="user-credentials">
          <span className="name">{tweet.name}</span>
          <span className="username">@{tweet.username}</span>
        </div>
        <div className="tweet-content">
          <p>{tweet.text}</p>
          <img src={tweet.img} />
        </div>
      </article>)
    });
  }
}
