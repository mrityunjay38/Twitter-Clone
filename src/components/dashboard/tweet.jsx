import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';

export default class Tweet extends Component {
  state = {
    text: "",
    imgUrl: "",
    img: {}
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleImgUpload = e => {
    // console.log(e.target.files[0]);
    this.setState({
      imgUrl: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0]
    });
  };

  newTweet = e => {
    e.preventDefault();
    const tweet = {
      name: this.props.user.name,
      username: this.props.user.username,
      uid: this.props.user.uid,
      text: this.state.text,
      img: this.state.imgUrl,
      is_retweet : false,
      retweet_count: 0,
      likes : 0,
      time: firebase.firestore.Timestamp.fromDate(new Date())
    };

    this.props.newTweet(tweet,this.state.img);

    this.setState({
      text: "",
      img: {},
      imgUrl: ""
    });
  };

  render() {
    const uploadedImgStyle = {
      background: "url(" + this.state.img + ")",
      backgroundSize: "cover",
      width: "90%",
      paddingBottom: "20em",
      backgroundPosition: "center center",
      alignSelf: "center"
    };

    return (
      <div className="tweets-section">
        <span>Home</span>
        <div className="add-tweet">
          <form onSubmit={this.newTweet}>
            <input
              value={this.state.text}
              onChange={this.handleChange}
              type="text"
              maxLength="140"
              placeholder="What's happening?"
            />
            <img src={this.state.imgUrl} />
            <div>
              <input
                onChange={this.handleImgUpload}
                type="file"
                name="imgUpload"
              />
              <span />
              <input type="submit" value="Tweet" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
