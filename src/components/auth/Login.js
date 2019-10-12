import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      isSignedIn: false
    };
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        fire.auth.GoogleAuthProvider.PROVIDER_ID,
        fire.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  }
  componentDidMount(){
    fire.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        this.props.history.push("/dashboard")
    }).catch((error) => {
        this.setState({errorMessage : "Invalid username/password"})
      });
  }

 
  render() {
    return (
      <div className="col-md-6">
        <form>
        <h3>Log in to Twitter</h3>
          <div class="form-group">
            <label for="Email">Email address</label>
            <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="Password">Password</label>
            <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" onClick={this.login} class="btn btn-primary">Login</button><br/>
          <p>{this.state.errorMessage}{this.props.errorMessage}</p>
        </form>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => fire.auth().signOut()}>Sign out!</button>
            <h1>Welcome {fire.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={fire.auth().currentUser.photoURL}
            />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={fire.auth()}
          />
        )}
      </div>
    );
  }
}
export default Login;

