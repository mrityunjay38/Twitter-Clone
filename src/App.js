import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from "./components/dashboard/dashboard";

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
}

export default App;
