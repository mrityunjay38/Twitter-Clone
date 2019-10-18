import React, { Component } from "react";
import "../../css/right-sidebar.scss";
import Search from "../Search";
import uuid from 'uuid';
import RightSideBarListItem from './RightSideBarListItem';
import fire from '../../firebaseConfig/config';
import FetchFollowers from '../dashboard/FetchFollowers'
import "../../css/onboard.css";

export default class RightSidebar extends Component {

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
            // let name = user.displayName.split('|')
            this.setState({ isSignedIn: !!user ,userId : user.uid, name: "",db:fire.firestore()})
            FetchFollowers.FetchFollowers().then(data => {
              this.setState({followers : data});  
           })
            this.getAllUser();
          })
          
      }
    
      getAllUser(){
        let userArr = [];
        fire.firestore().collection("users")
          .get()
          .then(querySnapshot => { 
            querySnapshot.forEach(doc => {
              if(doc.data().userId !== this.state.userId) {
                userArr.push(doc.data())
              } else {
                this.setState({name: doc.data().name})
              }
            }
            )
            this.setState( { users: userArr} )
            this.filteringUsers();
          })
    
      }
    
      filteringUsers(){
           let userArr = [];
           let userLimit = 4;
           let userList = this.state.users;
          //  for(let i = 0; userList.length;i++){
            this.state.users.map(user => {
                let isExist = false
                this.state.followers.filter(follower => {
                  if(user.userId === follower.userId && follower.follower_id === this.state.userId){
                    isExist = true;
                  }})
                  if(userArr.length < userLimit){
                    if(!isExist){
                      userArr.push(user)
                    }
                  // } else {
                  //   break;
                  }
              })
            // }
            this.setState({users : userArr});
      }
     
      toggleFollow(user) {
        let follow = {
          userId: user.userId,
          user_name: user.name,
          follower_id: this.state.userId,
          follower_name:this.state.name,
          id:uuid.v4()   
        }
        if(!user.isFollowing) {
          this.state.db.collection("followers")
          .doc(follow.id)
          .set(follow)
          .then(() => {
            fire.firestore().collection("followers")
              .where("follower_id","==", follow.follower_id)
              .where("userId","==", follow.userId)
              .get()
              .then(querySnapshot => {
                 querySnapshot.docs.map(doc => {
                   let filteredListRecord = this.state.users.filter((list) => {
                        if(list.userId === user.userId){
                            list.isFollowing = true;
                            list.style ={background:"#00adf4",color:"white"};
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
                  list.style ={background:""}
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
      <div className="right-sidebar-align">
        <Search />
        <div className="suggestion">
          <div className="suggestion-head">
            <h2>Who to follow </h2>
          </div>
          {users.map(user => (
            <RightSideBarListItem
              user={user}
              toggleFollow={this.toggleFollow}
            />
          ))}
        </div>
      </div>
    );
  }
}
