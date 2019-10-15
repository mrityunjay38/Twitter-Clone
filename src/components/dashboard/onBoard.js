import React from "react";
import fire from '../../firebaseConfig/config';
import FetchFollowers from './FetchFollowers'
import "../../css/onboard.css";
import uuid from 'uuid';
import img from '../../img/twitter_icon.png'
import { firestore, database } from 'firebase';
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
  }
  componentDidMount() {
    
      fire.auth().onAuthStateChanged(user => {
        console.log(user.displayName);
        let name = user.displayName.split('|')
        this.setState({ isSignedIn: !!user ,userId : user.uid, name: name[0]})
        console.log(this.state);
        this.getAllUser();
        // console.log(this.state.users);
        this.getUsers();
      })
  }

  getAllUser(){
    let db = fire.firestore();
    let userArr = [];
    db.collection("users")
      .get()
      .then(querySnapshot => { 
        querySnapshot.forEach(doc => {
          if(doc.data().userId != this.state.userId) {
            userArr.push(doc.data())
          }
        }
        )
        this.setState( { users: userArr} )
      })
  }

  getUsers(){
    FetchFollowers.FetchFollowers().then(followerData => {
      let userArr = [];
      followerData.forEach(follower => {
        this.state.users.map(user => {

          if(user.userId != follower.userId){
            user.isFollow = false;
            userArr.push(user);
          }
        }
          )
        this.setState({users : userArr});
      })
    })
  }

  follow(user) {

    let db = fire.firestore();

    this.setState({ 
      follow: {
        userId: user.userId,
        user_name:user.name,
        follower_id: this.state.userId,
        follower_name:this.state.name   
      }
     })
     
     const data = {
      ...this.state.follow
    };
    if(!user.isFollow) {
      db.collection("followers")
      .doc(this.state.userId)
      .set(data)
      .then(() => {
        db.collection("followers")
        .where("follower_id","==", this.state.follow.follower_id)
        .where("userId","==",this.state.follow.userId)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          let filteredListRecord = this.state.users.filter(
            (list) => {
              if(list.userId == user.userId){
                list.follow = true;
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
                          <div className="follow-button " onClick={this.follow.bind(this, user)}>
                            {user.isFollow ? (<p className="follow">Unfollow</p>): (<p className="follow">Follow</p>)}
                            {/* <p className="follow" onClick={() => this.follow(this,user)}>{user.follow}</p> */}
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
export default OnBoard;