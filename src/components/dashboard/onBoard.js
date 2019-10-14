import React from "react";
import fire from '../../firebaseConfig/config';
import FetchFollowers from './FetchFollowers'
import "../../css/onboard.css";
import uuid from 'uuid';
import img from '../../img/twitter_icon.png'
import { firestore, database } from 'firebase';
import { Link } from "react-router-dom";
class onBoard extends React.Component {
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
        this.getCurrentUser();
        this.getUsers();
      })
  }
  getCurrentUser(){
    let userRef = fire.firestore().collection("users").doc(`${this.state.userId}`)
    let getDoc = userRef.get().then(doc => {
      this.setState( { user_name: doc.data().name } );
    })
  }

  getUsers(){
    FetchFollowers.FetchFollowers().then(data => {
       this.setState({followers : JSON.parse(JSON.stringify(data))});
    })
    fire.firestore().collection("users")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
            var flag = 0;
            if(this.state.followers.length > 0) {
                 this.state.followers.map((follower) => {
                 if(doc.data().userId == this.state.userId || doc.data().userId == follower.follower_id){
                   flag=1;
                 }
                })
                if(flag==0){
                  var userObj = doc.data();
                  userObj.follow = "Follow";
                    this.state.users.push(userObj)
                }
            } else {
                 if(doc.data().userId != this.state.userId){
                  var userObje = doc.data();
                  userObje.follow = "Follow";
                    this.state.users.push(userObje)
                }
            }
           
            
        })
        this.setState({ users:  this.state.users });
      });
  }

  follow(event,user) {
      this.state.follow = {
              userId: user.userId,
              user_name:user.name,
              follower_id: this.state.userId,
              follower_name:this.state.user_name
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
        .where("userId","==",this.state.userId)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          let filteredListRecord = this.state.users.filter(
            (list) => {
              if(list.userId == user.userId){
                list.follow = "Unfollow";
                list.collectionId = doc.data().id
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
      .doc(user.collectionId)
      .delete()
      .then(() => {
        let filteredListRecord = this.state.users.filter(
          (list) => {
            if(list.userId == user.userId){
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
         <div className="skip">
              <div className="skip-img">
                <img src={img}/>
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
                <div>
                  <div key={user.userId} className="user">
                        <div className="user-name">
                            <h4>{user.name}</h4>
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

export default onBoard;
