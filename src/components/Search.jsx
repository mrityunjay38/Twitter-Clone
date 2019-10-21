import React, { Component } from "react";
import "../css/search.scss";
import db from "../firebaseConfig/db";

export default class Search extends Component {
  state = {
    users: [],
    resultantUsers: []
  };

  async componentDidMount() {
    await db.collection("users")
      .onSnapshot(snap => {
        snap.docs.forEach(doc => {
          // console.log(doc.data());
          this.setState({
            users: [doc.data(), ...this.state.users]
          });
        });
      });
  }

  noSubmit = (e) => {
    e.preventDefault();
  }

  searchUsers = (e) => {
    console.log("hit");
    e.preventDefault();
    let escapeChar = "";
    escapeChar = escapeChar + e.target.value;
    escapeChar = escapeChar.replace(/[/\\?^.|]/g, "");
    console.log(escapeChar);
    if (e.target.value !== ("" || "/" || "\\" || "?" || "^" || "." || "|") && escapeChar !== "") {
      let foundUsers = this.state.users.filter(user => {
        if (new RegExp(`^${escapeChar}`, "i").test(user.username) || new RegExp(`^${escapeChar}`, "i").test(user.name)) {
          return true;
        }
        return false;
      });
      this.setState({
        resultantUsers: [...foundUsers]
      });
    } else {
      this.setState({
        resultantUsers: []
      });
    }
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.noSubmit}>
          <span className="Icon Icon--search Icon--large" />
          <input
            onChange={this.searchUsers}
            type="text"
            placeholder="Search Twitter"
          />
        </form>
        <div className="result">
          <ul>
            {this.state.resultantUsers.map(user => {
              return (
                <li key={user.userId}>
                  <img src={user.photoURL} />
                  <span>
                    <strong>{user.name}</strong>
                    <br />@{user.username}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
