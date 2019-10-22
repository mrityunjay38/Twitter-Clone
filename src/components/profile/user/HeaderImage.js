import React, { Component } from 'react'
import defaultCover from "../../../img/cover.png";

class HeaderImage extends Component {
    render() {
        return (
            <div className="user-header-image-container">
                <img src={this.props.headerImage == "" ? defaultCover : this.props.headerImage}/>
            </div>
        )
    }
}

export default HeaderImage
