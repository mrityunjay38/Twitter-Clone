import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';
import "../../css/signup.scss";

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
      <div className="signup-form">
      <div className="form-container">
      <span className="Icon Icon--bird Icon--extraLarge"/>
        <form>
          <h1>Create your Account</h1>
          <div>
            <input value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Name"/>
            <input value={this.state.username} onChange={this.handleChange} type="text" name="username" placeholder="Username" />
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email" />
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
            <button onClick={this.signup} className="btn btn-signUp">Signup</button>
          </div>
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
      </div>
    );
  }
}
export default Signup;