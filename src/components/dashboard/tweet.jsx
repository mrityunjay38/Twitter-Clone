import React, { Component } from "react";

export default class Tweet extends Component {
  state = {
    username: "godlevel",
    name: "Xyz",
    text: "",
    img: ""
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    });
  };

  handleImgUpload = (e) => {
    this.setState({
      img : URL.createObjectURL(e.target.files[0])
    });
  }


  newTweet = e => {
    e.preventDefault();
    const tweet = {
      username: "godlevel",
      name: "Xyz",
      text: this.state.text,
      img: this.state.img
    };

    this.props.newTweet(tweet);

    this.setState({
        text : "",
        img : ""
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
    }

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
            {/* <div className="uploadImg" style={uploadedImgStyle}/> */}
            <img src={this.state.img}/>
            <div>
            <input onChange={this.handleImgUpload} type="file" name="imgUpload"/>
            <span/>
            <input type="submit" value="Tweet" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
