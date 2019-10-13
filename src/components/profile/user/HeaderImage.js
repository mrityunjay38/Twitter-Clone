import React, { Component } from 'react'

class HeaderImage extends Component {
    render() {
        return (
            <div>
                <img alt="User Header" src={this.props.photoURL}/>
            </div>
        )
    }
}

export default HeaderImage
