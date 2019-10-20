import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';
import TwitterIcon from '../../img/twitter_icon.png'
import "../../css/login.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      isSignedIn: false,
      userId: '',
      errorMessage: ''
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
            this.props.history.push(`/${this.state.username}/onboarding`)
          }
        })
    }).catch((error) => {
      console.log(error);
        this.setState({errorMessage : "Wrong email or password."})
      });
  }
 
  render() {
    return (
      <div className="login-form">
      <div className="form-container">
        <span className="Icon Icon--bird Icon--extraLarge"/>
        <form>
        <h1>Log in to Twitter</h1>
          <div>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email"/>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password"/>
            <button type="submit" onClick={this.login} class="btn btn-login">Login</button>
        </div>
        <p>{this.state.errorMessage}</p>
        </form>
        </div>
      </div>
    );
  }
}
export default Login;
