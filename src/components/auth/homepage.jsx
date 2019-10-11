import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../css/homepage.scss";

export default class Homepage extends Component {

    state = {
        redirect : false
    }

    login = () => {
        this.setState({
            redirect : true
        });
    }

  render() {
    return (
        <React.Fragment>
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
          <form onSubmit={this.login}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Log in" />
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
      {this.state.redirect ?  (<Redirect to="/dashboard"/>) : null}
      </React.Fragment>
    );
  }
}