import React from "react";
import fire from '../../firebaseConfig/config';
import FetchFollowers from '../dashboard/FetchFollowers'
import "../../css/onboard.css";
import uuid from 'uuid';
import RightSideBarListItem from './RightSideBarListItem';

class RightSideBar extends React.Component {
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
        this.state.users.map(user => {
          let isExist = false
          this.state.followers.filter(follower => {
            if(user.userId === follower.userId && follower.follower_id === this.state.userId){
              isExist = true;
            }})
            if(!isExist && userArr.length < 4){
              userArr.push(user)
            }
            return user;
        })
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
        
      <div className="suggestion">
          <div className="suggestion-head">
              <h2>Who to follow </h2>
          </div>
           
              {users.map(user => (
                <RightSideBarListItem user={user} toggleFollow={this.toggleFollow}/>
              ))}
      </div>
    );
  }
}
export default RightSideBar;