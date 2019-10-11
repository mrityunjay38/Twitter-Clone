import React, { Component } from 'react'

export class login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h3>Log in to Twitter</h3>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button>Login</button>
                </div>
            </form>
            </div>            
        )
    }
}

export default login