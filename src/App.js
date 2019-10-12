import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
// import Register from './components/auth/Register';
// import firebaseConfig from './firebaseConfig/config';
import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
