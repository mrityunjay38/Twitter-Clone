import React, { Component } from 'react'
import fire from '../../firebaseConfig/config';

<<<<<<< HEAD
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
||||||| merged common ancestors
export class login extends Component {

    state = {
        username: '',
        password: ''
=======
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
>>>>>>> Ashish
    }
  }
  componentDidMount(){
    fire.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if(user != null) {
          this.props.history.push("/dashboard")
      }
      console.log("user", user)
    })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        
    }).catch((error) => {
        this.setState({errorMessage : "Invalid username/password"})
      });
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