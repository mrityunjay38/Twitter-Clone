import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../firebaseConfig/config';
import TwitterIcon from '../../img/twitter_icon.png'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
        email: '',
        password: '',
        username: '',
        name: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e){
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{

        fire.auth().onAuthStateChanged(user => {

          user.updateProfile({
            displayName: this.state.name + '|' + this.state.username 
          }).then(function() {
            console.log('successfully Updated profile')
          }, function(error) {
            console.log(error)
          })

        let signup ={
              name: this.state.name,
              username: this.state.username,
              email:this.state.email,
              photo:'',
              userId: user.uid
              }
          
          const data = {
              ...this.state.signup
           };
           console.log("u data : ", signup)
          fire.firestore().collection("users")
            .doc(user.uid.toString())
            .set(signup)
            .then(() => {
              window.history = `/user/${user.uid}/onboarding`;
              // this.props.history.push(`/user/${user.uid}/onboarding`)
            })
        })

        this.setState({errorMessage : "Successfully Registered"})
        // console.log("Successfully Registered");
    }).catch((error) => {
        this.setState({errorMessage : error.message})
      })
  }

  render() {
    return (
      <div className="col-md-6">
      <div class="top-header-of-page">
          <Link to="/">
            <button>Home</button>
          </Link>
          <img style={{ width: '2.5rem' }} src={TwitterIcon} alt="login icon"/>
        </div>
        <form className="signUp-form form">
          <h3>Create your Account</h3>
        <div className="signUp-form-group form-group">
            <label htmlFor="FirstName">Name</label>
            <input  value={this.state.name} onChange={this.handleChange} onSelect={this.handleCSS} type="text" name="name" class="form-control" />
          </div>
          <div class="signUp-form-group form-group">
            <label for="Email">Username</label>
            <input  value={this.state.username} onChange={this.handleChange} type="text" name="username" class="form-control" />
          </div>
          <div class="signUp-form-group form-group">
            <label for="Email">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" />
          </div>
          <div class="signUp-form-group form-group">
            <label for="Password">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" />
          </div>
          <button onClick={this.signup} className="btn btn-signUp">Signup</button>
          <p>{this.state.errorMessage}</p>
        </form>
      
      </div>
    );
  }
}
export default Signup;