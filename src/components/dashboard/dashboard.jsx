import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "../dashboard/tweet";
import Tweets from "../tweets";

export default class Dashboard extends Component {
  state = {
    tweets: [
      {
        username: "godlevel",
        name: "Xyz",
        text: "Isn't it kinda cold up here?",
        img:
          "https://purewows3.imgix.net/images/articles/2018_06/the_night_king_game_of_thrones.jpg"
      }
    ]
  };

  addTweet = tweet => {
    this.setState({
      tweets: [...this.state.tweets, tweet]
    });
  };

  render() {
    const { tweets } = this.state;

    return (
      <section className="dashboard">
        <div className="left-sidebar">
          <h1 style={{ color: "white" }}>Profile area</h1>
        </div>
        <div className="middle">
          <Tweet newTweet={this.addTweet} />
          {/* <h1 style={{color: "white"}}>Tweet + Feeds area</h1> */}
          <Tweets tweets={tweets} />
        </div>
        <div className="right-sidebar">
          <h1 style={{ color: "white" }}>Follow/Unfollow snippet</h1>
        </div>
      </section>
    );
  }
}
