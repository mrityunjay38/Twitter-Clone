import React, { Component } from 'react'
import UserHeader from './user/UserHeader'
import HeaderImage from './user/HeaderImage'
import UserInfo from './user/UserInfo'

class UserArea extends Component {

    render() {
        // console.log(this.props.user)

        const { user, allTweets, TweetsAndReplies, Media, Likes, sub, noOfFollowing, noOfFollowers, createdAt } = this.props.state;

        // if(sub == 'tw')

        return (
            <div>
                {sub === 'Tweets' ? ( <UserHeader name={user.name} number={allTweets.length} sub={sub}/> ): (
                    sub === 'Replies' ? ( <UserHeader name={user.name} number={TweetsAndReplies.length} sub={sub}/> ) : (
                        sub === 'Media' ? ( <UserHeader name={user.name} number={Media.length} sub={sub}/> ) : (
                            <UserHeader name={user.name} number={Likes.length} sub={sub}/>
                        )
                    )
                )}
                <HeaderImage headerImage={user.headerPhotoURL}/>  
                <UserInfo 
                    handleChange={this.props.handleChange}
                    isSignedIn={this.props.isSignedIn}
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
