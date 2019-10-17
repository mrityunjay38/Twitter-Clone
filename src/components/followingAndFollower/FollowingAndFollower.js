import React from "react";
import "../../css/dashboard.scss";
import "../../css/following.css";
import LeftSideBar from "../sidebars/LeftSidebar";
import RightSideBar from "../sidebars/RightSideBar";
import UserFollowingList from "./UserFollowingList"
import UserFollowerList from "./UserFollowerList"
import fire from "../../firebaseConfig/config";
import { Link } from 'react-router-dom'

export default class FollowingAndFollower extends React.Component {
constructor(props){
    super(props);
    console.log(this.props)
    this.state = {
        menu: this.props.match.url.split("/")[2],
        followerStyle:{},
        followingStyle:{}
    }
    fire.auth().onAuthStateChanged(user => {
      let name = user.displayName.split('|')
      console.log("calling : ", name)
      this.setState({ name:name[0], username: name[1]})
  })
    this.getUserData = this.getUserData.bind(this);
}
  componentDidMount() {
      this.getUserData(this.props.match.url.split("/")[2]);
  }

  getUserData(dataType){
    this.setState({
      menu:dataType
    })
    if(dataType === "following"){
      this.setState({
        followingStyle : {color: "#4aa1f2"},
        followerStyle : {color: "rgb(214, 214, 214)"}
      }) 
    }else {
      this.setState({
        followerStyle : {color: "#4aa1f2"},
        followingStyle : {color: "rgb(214, 214, 214)"}
      })
    }
  }

  render() {
    return (
      <section className="dashboard">
        <div className="left-sidebar">
          <LeftSideBar username={this.state.username}/>
        </div>
        <div className="middle">
          <div className="head-follow">
            <div className="user-data">
                <h3>{this.state.name}</h3>
                <small>{this.state.username}</small>
            </div>
            <div className="follow-menu">
              <Link to={`/${this.state.username}/follower`}>
                <h4 onClick={this.getUserData.bind(this,"follower")} className="menu-item" style={this.state.followerStyle}>Followers</h4>
              </Link>
              <Link to={`/${this.state.username}/following`}>
                <h4 onClick={this.getUserData.bind(this,"following")} className="menu-item" style={this.state.followingStyle}>Following</h4>
              </Link>
            </div>
          </div>
          <div className="content-list">
            {this.state.menu === "following" ? (<UserFollowingList/>) : (<UserFollowerList/>)}
        </div>
        </div>
        <div className="right-sidebar">
          <RightSideBar/>
        </div>
      </section>
    );
  }
}
