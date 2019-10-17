import React from "react";
import fire from '../../firebaseConfig/config';
import "../../css/onboard.css";
import UserFollowerItem from './UserFollowerItem'
import FetchFollowers from '../dashboard/FetchFollowers'
import uuid from 'uuid';

class UserFollowingList extends React.Component {
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
        FetchFollowers.FetchFollowers().then(data => {
            this.setState({followers : data});  
         })
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
    fire.firestore().collection("followers").where("userId","==", this.state.userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
            var newObj = doc.data();
            // newObj.isFollowing = true;
           this.state.users.push(newObj)
        })
        this.setState({ users:  this.state.users });
        this.checkingForAlreadyFollowing();
      });
  }

  checkingForAlreadyFollowing(){
    
    let userArr = [];
    this.state.users.map(user => {
      let isExist = false;
      let follower_collection_id =""; 
      this.state.followers.filter(follower => {
        if(user.follower_id === follower.userId && follower.follower_id === this.state.userId){
          isExist = true;
          follower_collection_id = follower.id;
        }})
        if(isExist){
            user.isFollowing = true;
        } else {
            user.isFollowing = false;
        }
        user.follower_collection_id = follower_collection_id;
        userArr.push(user)
        return user;
    })
    this.setState({users : userArr});
  }

  toggleFollow(user,users) {
      let follow = {
              userId: user.follower_id,
              user_name: user.follower_name,
              follower_id: user.userId,
              follower_name: user.user_name,
              id: uuid.v4()
          };

    if(!user.isFollowing) {
      fire.firestore().collection("followers")
      .doc(follow.id.toString())
      .set(follow)
      .then(() => {
        fire.firestore().collection("followers")
        .where("follower_id","==",follow.follower_id)
        .where("userId","==",follow.userId)
      .get()
      .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
          let filteredListRecord = users.filter(
            (list) => {
              if(list.userId === user.userId){
                list.isFollowing = true;
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
      .doc(user.follower_collection_id)
      .delete()
      .then(() => {
        let filteredListRecord = users.filter(
          (list) => {
            if(list.follower_id === user.follower_id){
              list.isFollowing = false;
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
        <div>
              {users.map(user => (
                <div>
                  <UserFollowerItem user={user} users={users} toggleFollow={this.toggleFollow}/>
               </div>
              ))}
        
        </div>
    );
  }
}

export default UserFollowingList;