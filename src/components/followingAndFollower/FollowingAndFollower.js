import React from "react";
import "../../css/dashboard.scss";
import "../../css/following.css";
import LeftSideBar from "../sidebars/LeftSidebar";
import RightSideBar from "../sidebars/RightSideBar";
import UserFollowingList from "./UserFollowingList"
import UserFollowerList from "./UserFollowerList"


export default class FollowingAndFollower extends React.Component {
constructor(props){
    super(props);
    console.log(this.props)
    this.state = {
        menu: this.props.match.url.split("/")[2],
        followerStyle:{},
        followingStyle:{}
    }
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
          <LeftSideBar/>
        </div>
        <div className="middle">
          <div className="head-follow">
            <div className="user-data">
                <h3>Amal</h3>
                <small>@Amal369</small>
            </div>
            <div className="follow-menu">
                <h4 onClick={this.getUserData.bind(this,"follower")} className="menu-item" style={this.state.followerStyle}>Followers</h4>
                <h4 onClick={this.getUserData.bind(this,"following")} className="menu-item" style={this.state.followingStyle}>Following</h4>
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
