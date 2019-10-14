import React, { Component } from "react";
import "../../css/dashboard.scss";
import Tweet from "../dashboard/tweet";
import Tweets from "../tweets";
import fire from "../../firebaseConfig/config";
import LeftSideBar from "../sidebars/leftsidebar";

export default class Dashboard extends Component {

  state = {
    isSignedIn: false,
    tweets: [
      {
        username: "godlevel",
        name: "Night King",
        text: "Isn't it kinda cold up here?",
        img:
          "https://purewows3.imgix.net/images/articles/2018_06/the_night_king_game_of_thrones.jpg"
      },
      {
        username: "johnIknow",
        name: "John",
        text: "I don't know.",
        img : "https://cdn.vox-cdn.com/uploads/chorus_image/image/45629458/Jon_snow.0.jpg"
      },
      {
        username: "letsdrink",
        name: "Tyrion",
        text: "I'm surprised.",
        img: "https://wikiofthrones.com/static/uploads/2018/10/Peter-Dinklage-talks-about-the-journey-with-Game-of-Thrones-and-Tyrion-Lannister-6.jpg"
      }
    ]
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log(user.uid);
      if (user == null) {
      }
      console.log(this.props.history);
    });
  }

  addTweet = tweet => {
    this.setState({
      tweets: [tweet,...this.state.tweets]
    });
  };

  render() {
    const { tweets } = this.state;

    return (
      <section className="dashboard">
        <div className="left-sidebar">
          {/* <h1 style={{ color: "white" }}>Profile area</h1> */}
          <LeftSideBar/>
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
