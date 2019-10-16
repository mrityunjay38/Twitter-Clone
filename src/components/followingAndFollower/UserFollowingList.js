import React from "react";
import fire from '../../firebaseConfig/config';
import "../../css/onboard.css";
import UserFollowingItem from './UserFollowingItem'
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
            newObj.isFollowing = true;
           this.state.users.push(newObj)
        })
        this.setState({ users:  this.state.users });
      });
  }

  toggleFollow(user) {
      let follow = {
              userId: user.userId,
              user_name: user.user_name,
              follower_id: user.follower_id,
              follower_name: user.follower_name,
              id: uuid.v4()
          };
          console.log("user : ", user)
          console.log("follow : ", follow)

    if(user.follow == "Follow") {
      fire.firestore().collection("followers")
      .doc(follow.id.toString())
      .set(follow)
      .then(() => {
        fire.firestore().collection("followers")
        .where("follower_id","==",this.state.follow.follower_id)
        .where("userId","==",this.state.follow.userId)
      .get()
      .then(querySnapshot => {
          querySnapshot.docs.map(doc => {
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
        <div>
              {users.map(user => (
                <div>
                  <UserFollowingItem user={user} toggleFollow={this.toggleFollow}/>
               </div>
              ))}
        
        </div>
    );
  }
}

export default UserFollowingList;