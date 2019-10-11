import React, { Component } from 'react';
import "../css/tweets.scss"

export default class Tweets extends Component {
    
    // sample state

    state = {
        username : "godlevel",
        name : "Xyz",
        content : {
            text : "Isn't it kinda cold up here?",
            img : "https://purewows3.imgix.net/images/articles/2018_06/the_night_king_game_of_thrones.jpg"
        }
    }


    render(){
        const {name,username,content} = this.state;
        return (
            <article>
                <div className="user-credentials">
                <span className="name">{name}</span>
                <span className="username">@{username}</span>
                </div>
                <div className="tweet-content">
                <p>{content.text}</p>
                <img src={content.img}/>
                </div>
            </article>
        );
    }
}