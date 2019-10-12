import React, { Component } from 'react';
// import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
// import Homepage from "./components/auth/homepage";
import Login from './components/auth/Login';
<<<<<<< HEAD
import Signup from './components/auth/Signup';
import Dashboard from "./components/dashboard/dashboard";
||||||| merged common ancestors
import Register from './components/auth/Register';
=======
// import Register from './components/auth/Register';
import firebaseConfig from './firebaseConfig/config';
import Dashboard from './components/dashboard/Dashboard'
>>>>>>> Ashish

<<<<<<< HEAD
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/index" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
||||||| merged common ancestors
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
      </Switch>
    </Router>
    </div>
  );
=======
class App extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        this.setState({ user });
        // localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem('user');
      }
    })
  }

  render() {
    return (
      <div className="App">
      {/* <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
        </Switch>
      </Router> */}
      {this.state.user ? (<Dashboard />) : (<Login />)}
      </div>
    );
  }
>>>>>>> Ashish
}

export default App;
