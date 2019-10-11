<<<<<<< HEAD
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../firebaseConfig/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        this.props.history.push("/UserRegistration")
    }).catch((error) => {
        this.setState({errorMessage : "Invalid username/password"})
      });
  }

 
  render() {
    return (
      <div className="col-md-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" onClick={this.login} class="btn btn-primary">Login</button><br/>
          <p>{this.state.errorMessage}{this.props.errorMessage}</p>
        </form>
      
      </div>
    );
  }
}
export default Login;

=======
import React, { Component } from 'react'

export default class Login extends Component {

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
>>>>>>> c3cf5fca63beb6a8979fab7f1748ab7ccb409eed
