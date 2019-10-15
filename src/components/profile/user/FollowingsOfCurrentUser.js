import React from "react";
import fire from '../../firebaseConfig/config';
import FetchFollowers from './FetchFollowers'
import "../../css/onboard.css";
import uuid from 'uuid';
import img from '../../../img/twitter_icon.png'
import { firestore, database } from 'firebase';
import { Link } from "react-router-dom";

class followingsCurrentUSer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      follow:{},
      userId:'',
      followers:[]
    };
  }

  componentDidMount() {
    
      fire.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user ,userId : user.uid})
        this.setState({userId:user.uid});
        this.getCurrentUser()
        this.getUsers();
      })
  }

  getCurrentUser(){
    fire.firestore().collection("users").where("userId","==", this.state.userId)
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        this.setState({user_name : doc.data().name}) 
      })
    })
  }

  getUsers(){
    fire.firestore().collection("followers").where("follower_id","==", this.state.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
            var newObj = doc.data();
            newObj.follow = "Unfollow"
           this.state.users.push(newObj)
        })
        this.setState({ users:  this.state.users });
      });
  }

  follow(event,user) {
      this.state.follow = {
              userId: user.userId,
              user_name: user.user_name,
              follower_id: user.follower_id,
              follower_name: user.follower_name,
          };
       const data = {
      ...this.state.follow,
      id: uuid.v4()
    };
    if(user.follow == "Follow") {
      fire.firestore().collection("followers")
      .doc(data.id.toString())
      .set(data)
      .then(() => {
        fire.firestore().collection("followers")
        .where("follower_id","==",this.state.follow.follower_id)
        .where("userId","==",this.state.follow.userId)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          let filteredListRecord = this.state.users.filter(
            (list) => {
              if(list.userId == user.userId){
                list.follow = "Unfollow";
                list.id = doc.data().id
              }
              return list;
            } );
           this.setState({users : []});
          this.setState({
            users: filteredListRecord
          });
        })
      })
        
      })
    } else {
      fire.firestore().collection("followers")
      .doc(user.id)
      .delete()
      .then(() => {
        let filteredListRecord = this.state.users.filter(
          (list) => {
            if(list.follower_id == user.follower_id){
              list.follow = "Follow";
            }
            return list;
          } );
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
            <div className="users">
              {users.map(user => (
                <div>
                  <div key={user.userId} className="user">
                        <div className="user-name">
                            <h4>{user.user_name}</h4>
                          </div>
                          <div className="follow-button">
                            <p className="follow" onClick={() => this.follow(this,user)}>{user.follow}</p>
                          </div>
                  </div>
                  <hr/>
               </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default followingsCurrentUSer;
