import React, { Component } from 'react'
import UserAvatar from './UserAvatar'

class UserDetails extends Component {

    state = {
        FirstName: '',
        LastName: '',
        Username: '',
        Bio: '' 
    }

    render() {
        return (
            <div>
            <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          <UserAvatar />
          <button>Submit</button>
          </form>
            </div>
        )
    }
}

export default UserDetails
