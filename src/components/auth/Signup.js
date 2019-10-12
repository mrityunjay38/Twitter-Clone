import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';

class Signup extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup = (e) => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log('Successfully Registered');
        this.setState({Message : "Successfully Registered"})
    }).catch((error) => {
        this.setState({Message : error.message})
      })
  }
  
  render() {
    return (
      <div className="col-md-6">
        <form>
          <div class="form-group">
            <label for="Email">Email address</label>
            <input  onvalue={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="Password">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="password" placeholder="Password" />
          </div>
          <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
          <p>{this.state.Message}</p>
        </form>
      
      </div>
    );
  }
}
export default Signup;

