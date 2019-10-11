import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../firebaseConfig/config';

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
        firstName:'',
        lastName:'',
        email: '',
        password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        this.setState({errorMessage : "Successfully Registered"})
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        this.setState({errorMessage : error.message})
      })
  }
  render() {
    return (
      <div className="col-md-6">
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input  value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" class="form-control" id="firstName" aria-describedby="firstnameHelp" placeholder="Enter first name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input  value={this.state.lastName} onChange={this.handleChange} type="test" name="lastName" class="form-control" id="lastName" aria-describedby="lastnameHelp" placeholder="Enter last name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="password" placeholder="Password" />
          </div>
          <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
          <p>{this.state.errorMessage}</p>
        </form>
      
      </div>
    );
  }
}
export default UserRegistration;

