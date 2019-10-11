import React, { Component } from 'react';

export default class Tweet extends Component {
    render(){
        return (
            <div className="tweets-section">
            <span>Home</span>
            <div className="add-tweet">
            <form>
                <input type="text" maxLength="140" placeholder="What's happening?"/>
                <input type="submit" value="Tweet"/>
            </form>
            </div>
            </div>
        );
    }
}