import React, { Component } from 'react'
import moment from 'moment'
// import undefined from 'firebase/empty-import';

const modal = ({ children, showHideClassName, handleClose, tweet }) => {

    console.log(tweet);

    if (tweet == undefined) {
        var tweetDetails = null;
    } else {
        const { name, username, time, text } = tweet
        var tweetDetails = ( 
                <div className="user-credentials" style={{ color: 'white' }}>
                    <span style={{ font: 'bold 1rem helvetica' }}>{name}</span>
                    <span style={{     
                        padding: '0 1rem',
                        fontSize: 'small',
                        color: 'lightslategray' 
                    }}>@{username}</span>
                    <span style={{
                        color: 'lightslategray',
                        fontSize: 'small'
                    }}>
                        {moment(time.toDate()).fromNow()}
                    </span>
                    <div style={{ fontSize: 'small' }}>
                        <p>{text}</p>
                    </div>
                </div>
            )         
    }
    
    return (
        <div style={showHideClassName} className="modal">
            <section className="modal-main" style={{ background: 'black', borderRadius: '1rem' }}>
                <span onClick={handleClose} style={{ cursor: 'pointer', color: 'white', padding: '1rem' }}>X</span>
                <hr style={{ 
                    border: '0.02rem solid white',
                    width: '100%',
                    margin: '0'}} />
                <div style={{     
                    padding: '1rem',
                    overflowY: 'auto'
                 }}>
                    {tweetDetails}
                    <p style={{ color: 'white', margin: '0' }}>|</p>
                    <p style={{ color: 'white', margin: '0' }}>|</p>
                    <p style={{ color: 'white', margin: '0' }}>|</p>
                    <p style={{ color: 'white'}}>Type your Reply</p>
                    {children}
                </div>
            </section>
        </div>
    );
}

export default modal

