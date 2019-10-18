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
      .get()
      .then(snap => {
        snap.docs.forEach(doc => {
          console.log(doc.data());
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
    // let char = e.target.value;
    // if(char == "\\" && char == "?" && char == "^" && char == "." && char == "|"){
    //   e.target.value = '';
    // }
    let escapeChar = [...new Set([...e.target.value])].join('');
    console.log(escapeChar);
    if (e.target.value !== "" && escapeChar !== "\\" && escapeChar !== "?" && escapeChar !== "^" && escapeChar !== "." && escapeChar !== "|") {
      let foundUsers = this.state.users.filter(user => {
        if (new RegExp(`^${e.target.value}`, "i").test(user.username) || new RegExp(`^${e.target.value}`, "i").test(user.name)) {
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
                  <img src={user.photoUrl} />
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
