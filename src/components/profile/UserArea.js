import React, { Component } from 'react'
import UserHeader from './user/UserHeader'
import HeaderImage from './user/HeaderImage'
import UserInfo from './user/UserInfo'

class UserArea extends Component {

    render() {
        // console.log(this.props.user)

        const { user, tweets, sub, noOfFollowing, noOfFollowers, createdAt } = this.props.state;

        return (
            <div>
                <UserHeader name={user.name} number={tweets.length} sub={sub}/> 
                <HeaderImage headerImage={user.headerPhotoURL}/>  
                <UserInfo 
                    createdAt={createdAt}
                    user={user}
                    noOfFollowing={noOfFollowing}
                    noOfFollowers={noOfFollowers}
                />
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
