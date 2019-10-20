import React, { Component } from 'react'
import db from '../../firebaseConfig/db'
import fire from '../../firebaseConfig/config'
import moment from 'moment'
import LeftSidebar from '../sidebars/LeftSidebar'
import RightSidebar from '../sidebars/RightSidebar'

class DisplayTweets extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tweetId: this.props.match.params.id, 
            tweet: {}
        }

        fire.auth().onAuthStateChanged(user => {
            let name = user.displayName.split('|')
            this.setState({ name:name[0], username: name[1], userId: user.uid})
        })
    }

    async componentDidMount() {
        await db.collection('tweets').doc(this.state.tweetId).get().then(doc => {
            let tweet = doc.data();
            tweet.id = doc.id;
            this.setState({ tweet });
        })
    }

    render() {
        const {name, username, time, text, img} = this.state.tweet;

        console.log(this.state);
        
        return (
            <section className="dashboard">
                <div className="left-sidebar">
                    <LeftSidebar username={this.state.username}/>
                </div>
                <div className="middle">
                    <div>
                        <h3>Tweets</h3>
                    </div>
                    <div className="user-credentials">
                        <span className="name">{name}</span>
                        <span className="username">@{username}</span>
                        {/* <span className="username">{moment(time.toDate())}</span> */}
                    </div>
                    <div className="tweet-content">
                        <p>{text}</p>
                        <img src={img} />
                    </div>
                </div>
                <div className="right-sidebar">
                    <RightSidebar/>
                </div>
            </section>
        )
    }
}

export default DisplayTweets
