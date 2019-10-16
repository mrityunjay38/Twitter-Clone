import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';
import TwitterIcon from '../../img/twitter_icon.png'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      isSignedIn: false,
      userId: ''
    };
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login (e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        fire.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user, userId: user.uid})
          if(user) {
            this.props.history.push(`/user/${user.uid}/onboarding`)
          }
        })
    }).catch((error) => {
        this.setState({errorMessage : error})
      });
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
        <form className="login-form form">
        <h3>Log in to Twitter</h3>
          <div class="login-form-group form-group">
            <label for="Email">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" />
          </div>
          <div class="login-form-group form-group">
            <label for="Password">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" />
          </div>
          <Link to={`user/${this.state.userId}/onboarding`}>
            <button type="submit" onClick={this.login} class="btn btn-login">Login</button><br/>
          </Link>
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}
export default Login;
