import React, { Component } from 'react'

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

export default login