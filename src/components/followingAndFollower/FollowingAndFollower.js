import React from "react";
import "../../css/dashboard.scss";
import "../../css/following.css";

import db from "../../firebaseConfig/db.js";
import LeftSideBar from "../sidebars/LeftSidebars";
import UserFollowingList from "./UserFollowingList"

export default class FollowingAndFollower extends React.Component {
constructor(props){
    super(props);
    this.state = {
        menu: this.props.match.url.split("/")[2],
        followerStyle:{},
        followingStyle:{}
    }
    this.getUserData = this.getUserData.bind(this);
}
  componentDidMount() {
      this.setCssStyle();
  }

  setCssStyle(){
    if(this.state.menu === "following"){
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

  getUserData(dataType){
    this.setState({
      menu:dataType
    })
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
            {this.state.menu == "following" ? (<UserFollowingList/>) : (
              <React.Fragment>
              
            {/* </React.Fragment>
            <React.Fragment> */}
             <div className="user-list">
              <div className="user-name">
                <h3>Akshay</h3>
              </div>
              <div className="follow-button ">
                  <p className="follow">Follow</p>
              </div>
             </div>
            <div className="user-list">
              <div className="user-name">
                <h3>Pramod</h3>
              </div>
              <div className="follow-button ">
                  <p className="follow">Follow</p>
              </div>
            </div>
            <div className="user-list">
              <div className="user-name">
                <h3>Jumil</h3>
              </div>
              <div className="follow-button ">
                  <p className="follow">Unfollow</p>
              </div>
            </div>
            <div className="user-list">
              <div className="user-name">
                <h3>Ashish</h3>
              </div>
              <div className="follow-button ">
                  <p className="follow">Follow</p>
              </div>
            </div>
            <div className="user-list">
              <div className="user-name">
                <h3>Mrityunjay</h3>
              </div>
              <div className="follow-button ">
                  <p className="follow">Unfollow</p>
              </div>
            </div>
            <div className="user-list">
                <div className="user-name">
                  <h3>Arjun</h3>
                </div>
                <div className="follow-button ">
                    <p className="follow">Follow</p>
                </div>
              </div>
          {/* </React.Fragment>
          <React.Fragment> */}           
        </React.Fragment>
            )}
        </div>
        </div>
        <div className="right-sidebar">
          {/* <h1 style={{ color: "white" }}>Follow/Unfollow snippet</h1> */}
        </div>
      </section>
    );
  }
}
