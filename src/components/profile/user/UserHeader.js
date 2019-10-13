import React, { Component } from 'react'

export class UserHeader extends Component {
    render() {
        console.log(this.props.name);
        return (
            <div>
                <h4>{this.props.name}</h4>
            </div>
        )
    }
}

export default UserHeader
