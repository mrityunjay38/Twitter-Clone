import React, { Component } from 'react'
import UserHeader from './user/UserHeader'
import HeaderImage from './user/HeaderImage'
import UserInfo from './user/UserInfo'

class UserArea extends Component {

    render() {
        // console.log(this.props.user)

        // const { name, username, CreatedAt, Followers, Following, userPhotoURL, headerPhotoURL } = this.props.user;

        return (
            <div>
                <UserHeader /> 
                <HeaderImage />  
                <UserInfo />
                    {/* name={name}
                    username={username}
                    CreatedAt={CreatedAt}
                    Following={Following}
                    Followers={Followers}
                    userPhoto={userPhotoURL} */}
                        
                {/* <h1>Hello</h1> */}
            </div>
        )
    }
}

export default UserArea
