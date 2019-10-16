import React from "react";
import fire from '../../firebaseConfig/config';
import FetchFollowers from './FetchFollowers'
import "../../css/onboard.css";
import uuid from 'uuid';
import img from '../../img/twitter_icon.png';
import OnBoardListItem from './OnBoardListItem';
import { Link } from "react-router-dom";

class OnBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      follow:{},
      userId:'',
      followers:[]
      
    };
    this.toggleFollow = this.toggleFollow.bind(this)
  }
  componentDidMount() {
    
      fire.auth().onAuthStateChanged(user => {
        let name = user.displayName.split('|')
        this.setState({ isSignedIn: !!user ,userId : user.uid, name: name[0]})
        this.getAllUser();
        this.filteringUsers();
      })
  }

  getAllUser(){
    let db = fire.firestore();
    let userArr = [];
    db.collection("users")
      .get()
      .then(querySnapshot => { 
        querySnapshot.forEach(doc => {
          if(doc.data().userId !== this.state.userId) {
            userArr.push(doc.data())
          }
        }
        )
        this.setState( { users: userArr} )
      })
  }

  filteringUsers(){
    FetchFollowers.FetchFollowers().then(followerData => {
      let userArr = [];
      followerData.forEach(follower => {
        this.state.users.map(user => {
          if(user.userId !== follower.userId){
            user.isFollowing = false;
            userArr.push(user);
          }
        })
        this.setState({users : userArr});
      })
    })
  }

  toggleFollow(user) {
    let db = fire.firestore();
    let follow = {
      userId: user.userId,
      user_name: user.name,
      follower_id: this.state.userId,
      follower_name:this.state.name,
      id:uuid.v4()   
    }
    if(!user.isFollowing) {
      db.collection("followers")
      .doc(follow.id)
      .set(follow)
      .then(() => {
          db.collection("followers")
          .where("follower_id","==", follow.follower_id)
          .where("userId","==", follow.userId)
          .get()
          .then(querySnapshot => {
             querySnapshot.docs.map(doc => {
               let filteredListRecord = this.state.users.filter((list) => {
                    if(list.userId === user.userId){
                        list.isFollowing = true;
                        list.collectionId = doc.data().id
                    }
                  return list;
                });
                this.setState({users : []});
                this.setState({users: filteredListRecord});
              })
          })
    })
    } else {
      fire.firestore().collection("followers")
      .doc(user.collectionId)
      .delete()
      .then(() => {
        let filteredListRecord = this.state.users.filter((list) => {
            if(list.userId === user.userId){
              list.isFollowing = false;
            }
            return list;
          });
         this.setState({users : []});
        this.setState({
          users: filteredListRecord
        });
      })
    }
  }
  
  render() {
    const { users } = this.state;
    return (
      <div className="onboard">
        <div className="user-collection">
         <div className="skip">
              <div className="skip-img">
                <img src={img} alt="Twitter-Logo"/>
              </div>
              <div className="skip-text">
                <Link to={"/dashboard"}>Skip</Link>
              </div>
          </div>
          <div className="suggestions">
            <h2>Suggestions for you to follow</h2>
          </div>
          <div>
            <hr/>
              <h4>You may be interested in</h4>
            <hr/>
          </div>
          <div className="users">
              {users.map(user => (
                <OnBoardListItem user={user} toggleFollow={this.toggleFollow}/>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default OnBoard;