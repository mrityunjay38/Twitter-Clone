import React, { Component } from 'react'
import fire from '../../firebaseConfig/config';

export class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // state = {
    //     email: '',
    //     password: ''
    // }

    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                // this.props.history = 
                console.log('Successfully Logged in.')

            }).catch((error) => {
                console.log(error);
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)

    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <h3>Log in to Twitter</h3>
                <div className="input-field">
                    <label htmlFor="email">Username</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button onClick={this.login}>Login</button>
                </div>
            </form>
            </div>            
        )
    }
}

export default login