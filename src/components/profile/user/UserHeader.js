import React, { Component } from 'react'

export class UserHeader extends Component {
    render() {
        // console.log(this.props.name);
        return (
            <div className="profile-user-header-container-1">
                <div className="profile-user-header-container-2">
                    <h4>{this.props.name}</h4>
                    <h5>{this.props.sub}</h5>
                </div>
            </div>
        )
    }
}

export default UserHeader
