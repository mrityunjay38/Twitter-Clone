import React, { Component } from 'react'

class HeaderImage extends Component {
    render() {
        return (
            <div className="user-header-image-container">
                <img src={this.props.headerImage}/>
            </div>
        )
    }
}

export default HeaderImage
