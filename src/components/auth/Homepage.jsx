import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../css/homepage.scss";
import fire from "../../firebaseConfig/config";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      isSignedIn: false,
      errorMessage: "",
      loading: true
    };
  }
  
  componentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log(this.state.isSignedIn);
      // setTimeout(() => {
        if (user != null) {
          // this.props.history.push("/dashboard");
          this.setState({ loading: !this.state.loading })
        }
      // }, 1500)
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        this.setState({ errorMessage: "Invalid username or password" });
      });
  }

  render() {
    const { loading }= this.state
    return (
      <div>
        {loading ? (
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
          <form>
            <div>
            <input
              type="email"
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={this.handleChange}
              name="password"
              placeholder="Password"
            />
            <input type="submit" onClick={this.login} value="Log in" />
            </div>
            <p>{this.state.errorMessage}</p>
          </form>
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
        ) : (
          <Redirect to="/dashboard"/>
        )}

        </div>
    );
  }
}
