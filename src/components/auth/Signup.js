import React, { Component } from 'react';
import fire from '../../firebaseConfig/config';
import "../../css/signup.scss";
import { Redirect } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
        email: '',
        password: '',
        username: '',
        name: '', 
        isLoading: true
    };
  }

  componentDidMount() {
    // this.setState({ isLoading: !this.state.isLoading });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e){
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log(u.user);
      u.user.updateProfile({
        displayName: this.state.name + '|' + this.state.username 
      }).then(function() {
        console.log('successfully Updated profile')
      }, function(error) {
        console.log(error)
      })

        // fire.auth().onAuthStateChanged(user => {
          // console.log(user);

        let signup = { 
              name: this.state.name,
              username: this.state.username,
              email:this.state.email,
              photoURL: u.user.photoURL,
              userId: u.user.uid,
              headerPhotoURL: '',
              bio: ''
            }
         
           console.log("u data : ", signup)
          fire.firestore().collection("users")
            .doc(u.user.uid.toString())
            .set(signup)
            .then(() => {
              // window.location.href = `/user/${this.state.username}/onboarding`;
              {/* <Redirect to={`/user/${this.state.username}/onboarding`} /> */}
              this.setState({ isLoading: !this.state.isLoading });              
            })
        // })

        this.setState({errorMessage : "Successfully Registered"})
        // console.log("Successfully Registered");
    }).catch((error) => {
        this.setState({errorMessage : error.message})
      })
  }

  render() {

    const { isLoading, username } = this.state;

    console.log(isLoading, username);

    return (
      <div>
        {isLoading ? 
              ( 
              <div className="signup-form">
      <div className="form-container">
      <span className="Icon Icon--bird Icon--extraLarge"/>
        <form>
          <h1>Create your Account</h1>
          <div>
            <input value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Name" required/>
            <input value={this.state.username} onChange={this.handleChange} type="text" name="username" placeholder="Username" required/>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email" required/>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" required/>
            <button onClick={this.signup} className="btn btn-signUp">Signup</button>
          </div>
          <p>{this.state.errorMessage}</p>
        </form>
      </div>
      </div>
               ) : 
              (
                <Redirect to={`/${username}/onboarding`} />
              )
        }

      </div>
    );
  }
}
export default Signup;