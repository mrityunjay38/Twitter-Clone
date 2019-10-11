import React, { Component } from 'react'

export default class Signup extends Component {
    state = {
        name: '',
        email: '',
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
                <h5>SIGN UP</h5>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button>Register</button>
                </div>
            </form>
            </div>            
        )
    }
}