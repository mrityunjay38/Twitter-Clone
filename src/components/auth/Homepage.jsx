import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/homepage.scss";
import fire from '../../firebaseConfig/config'

export default class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  componentDidMount(){
    fire.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if(user != null) {
          this.props.history.push("/dashboard")
      }
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


  render() {
    return (
      <section className="static-homepage">
        <div className="twitter-features">
          <div>
            <div className="align-features">
              <span className="Icon Icon--search Icon--extraLarge" />
              <p>Follow your interests.</p>
            </div>
            <div className="align-features">
              <span className="Icon Icon--people Icon--extraLarge" />
              <p>Hear what people are talking about.</p>
            </div>
            <div className="align-features">
              <span className="Icon Icon--reply Icon--extraLarge" />
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <div className="loggedout-homepage">
          <div className="join-twitter">
            <span className="Icon Icon--bird Icon--extraLarge" />
            <h1>See what's happening in the world right now</h1>
            <div>
              <h2>Join Twitter today</h2>
              <Link to="/signup">Sign up</Link>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
