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
    console.log(this.props.tweets);

    return this.props.tweets.map(tweet => {
      // console.log(tweet);
      return (<article>
        <div className="user-credentials">
          <span className="name">{this.props.user.name}</span>
          <span className="username">@{this.props.user.username}</span>
          <span className="username">@{this.props.tweets.time}</span>

        </div>
        <div className="tweet-content">
          <p>{tweet.text}</p>
          <img src={tweet.img} />
        </div>
      </article>)
    });
  }
}
