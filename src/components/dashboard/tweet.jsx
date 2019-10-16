import React, { Component } from "react";
import fire from '../../firebaseConfig/config'
import { firestore } from "firebase";

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
      uid: this.props.user.userId,
      text: this.state.text,
      img: this.state.imgUrl,
      is_retweet : false,
      retweet_count: 0,
      likes : 0,
      created: new Date()
      // firebase.database.ServerValue.TIMESTAMP
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
