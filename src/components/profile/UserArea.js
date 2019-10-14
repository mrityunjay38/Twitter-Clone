import React, { Component } from 'react'
import UserHeader from './user/UserHeader'
import HeaderImage from './user/HeaderImage'
import UserInfo from './user/UserInfo'

class UserArea extends Component {

    render() {
        // console.log(this.props.user)

        const { name, username, CreatedAt, Followers, Following, userPhotoURL, headerPhotoURL } = this.props.user;

        return (
            <div>
                <UserHeader name={name} sub={this.props.sub}/> 
                <HeaderImage photoURL={headerPhotoURL}/>  
                <UserInfo 
                    name={name}
                    username={username}
                    CreatedAt={CreatedAt}
                    Following={Following}
                    Followers={Followers}
                    userPhoto={userPhotoURL}
                />             
            </div>
        )
    }
}

export default UserArea
