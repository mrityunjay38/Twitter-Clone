import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import UserArea from "./UserArea";
import DisplayTweets from "../tweets/DisplayTweets";
import LeftSidebar from "../sidebars/LeftSidebar";

class UserProfileWithTweets extends Component {
  state = {
    isSignedIn: false,
    user: {
      name: "Ashish Padhi",
      username: "Zodiac0606",
      Followers: [
        {
          uid: 1,
          name: "Halo",
          username: "game_of_the_year",
          userPhotoURL: "https://i.redd.it/tqr6vf9i34l21.jpg"
        }
      ],
      Following: [
        {
          uid: 3,
          name: "One Piece",
          username: "best_anime",
          userPhotoURL:
            "https://en.wikipedia.org/wiki/List_of_One_Piece_characters#/media/File:Main_characters_of_One_Piece.png"
        }
      ],
      userPhotoURL:
        "https://i.pinimg.com/474x/41/bf/4b/41bf4b466baf974aa6b50cab301c77d9--scorpio-sign-tattoos-symbol-tattoos.jpg",
      likes: [
        {
          tweetID: 1,
          tweet:
            "Hey, Its been a long time since I've posted any new songs. So I've just come up with a new song. plz like it.",
          uid: 2,
          username: "SanjanaSinger007",
          name: "Sanjana Singh",
          likes: 23,
          reply: [
            {
              tweetID: 324,
              tweet: "abscskfbsdjkfb",
              uid: 5,
              username: "qwerty12345",
              name: "keyboard",
              likes: 453
            }
          ]
        }
      ],
      tweets: [
        {
          tweetID: 1,
          tweet: "Hello Everyone!",
          photoURL: "https://wallpaperplay.com/walls/full/6/7/7/275271.jpg",
          likes: 1297,
          isReply: false,
          reply: [
            {
              tweetID: 324,
              tweet: "abscskfbsdjkfbafnajafjbafjsafjbdsfjkbdsjkb",
              uid: 5,
              username: "qwerty12345",
              name: "keyboard",
              likes: 4
            }
          ]
        }
      ],
      replies: [
        {
          tweetID: 5,
          tweet: "skdfkugbfkjdsfhisgdfhibadsjkbvd",
          replied_to: 65
        }
      ],
      headerPhotoURL: "https://wallpaperplay.com/walls/full/f/c/d/275250.jpg",
      CreatedAt: "March 2016",
      Media: []
    },
    sub: "Tweets"
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      // console.log(user);
      this.setState({ isSignedIn: !!user, userID: user.uid });
      if (user == null) {
      }
      // console.log(this.props.history)
    });
  }

  render() {
    // console.log(this.state.user);
    return (
      <section className="profile-area">
        <div className="profile-area-container">
          <div className="left-sidebar">
            <LeftSidebar />
          </div>
          <div className="user-area">
            <UserArea user={this.state.user} sub={this.state.sub} />
            <DisplayTweets />
          </div>
          <div className="trends-who-to-follow-area">
            <h1>Hello There will be Trends here in the future.</h1>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
