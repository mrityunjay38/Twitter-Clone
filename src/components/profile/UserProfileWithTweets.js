import React, { Component } from "react";
import fire from "../../firebaseConfig/config";
import db from "../../firebaseConfig/db.js";
import UserArea from "./UserArea";
import Tweets from "../../components/tweets";
import LeftSidebar from "../sidebars/LeftSidebar";
import RightSidebar from "../sidebars/RightSidebar";



class UserProfileWithTweets extends Component {

  constructor(props) {

    super(props);

    this.state = {
      isSignedIn: false,
      user : {},
      tweets: [],
      noOfFollowing: 0,
      noOfFollowers: 0, 
      sub: 'Tweets',
      withTweets: false,
      withReplies: false,
      media: false,
      likes: false
    };

    fire.auth().onAuthStateChanged(user => {
      console.log();
      let CreatedTime = user.metadata.creationTime.split(' ');
      console.log(CreatedTime)
      let name = user.displayName.split('|')
      // console.log("calling : ", name)
      this.setState({ currentUser:{ userId: user.uid, name:name[0], username: name[1] }, createdAt: CreatedTime[2] + ' ' + CreatedTime[3]})
  })
  }
  

  async componentDidMount() {

    await db.collection('users').where('username', '==', this.props.match.params.id ).get().then( snap => {
      snap.docs.forEach( doc => {
        console.log(doc.data())
        this.setState( { user: doc.data() } );
      } )
    } )

    await db.collection('tweets').where('uid', '==', this.state.user.userId ).get().then( snap => {
      snap.docs.forEach( doc => {
        console.log(doc.data());

        this.setState({
            tweets : [doc.data(),...this.state.tweets]
          })
        }
      );
    });

    await db.collection('followers').where('follower_id', '==', this.state.user.userId).get().then( snap => {
      this.setState({ noOfFollowing: snap.docs.length });
      
    } );

    await db.collection('followers').where('userId', '==', this.state.user.userId).get().then( snap => {
      this.setState( { noOfFollowers: snap.docs.length } );
    } )
  }

  render() {
    
    const { tweets } = this.state;

    return (
      <section className="profile-area">
        <div className="profile-area-container">
          <div className="left-sidebar">
            <LeftSidebar username={this.props.match.params.id}/>
          </div>
          <div className="middle">
            <UserArea state={this.state}/>
            <div>
            <Tweets tweets={tweets}/>

            </div>
          </div>
          <div className="trends-who-to-follow-area">
            <RightSidebar />
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileWithTweets;
