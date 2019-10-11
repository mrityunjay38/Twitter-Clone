import React, { Component } from "react";

export default class Tweet extends Component {
  state = {
    username: "godlevel",
    name: "Xyz",
    text: "",
    img: ""
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  newTweet = e => {
    e.preventDefault();
    const tweet = {
      username: "godlevel",
      name: "Xyz",
      text: this.state.text,
      img: ""
    };

    this.props.newTweet(tweet);

    this.setState({
        text : ""
    });
  };

  render() {
    return (
      <div className="tweets-section">
        <span>Home</span>
        <div className="add-tweet">
          <form onSubmit={this.newTweet}>
            <input value={this.state.text}
              onChange={this.handleChange}
              type="text"
              maxLength="140"
              placeholder="What's happening?"
            />
            <input type="submit" value="Tweet" />
          </form>
        </div>
      </div>
    );
  }
}
