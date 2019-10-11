import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
<<<<<<< HEAD

import Homepage from "./components/auth/homepage";
import UserRegistration from "./components/auth/UserRegistration";
import Login from "./components/auth/Login";


=======
import Homepage from "./components/auth/homepage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from "./components/dashboard/dashboard";
>>>>>>> c3cf5fca63beb6a8979fab7f1748ab7ccb409eed

function App() {
  return (
    <div className="App">
    <Router>
<<<<<<< HEAD
      <Route path="/Index" component={Homepage} />
      <Route path="/Login" component={Login} />
      <Route path="/UserRegistration" component={UserRegistration} />

=======
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        </Switch>
>>>>>>> c3cf5fca63beb6a8979fab7f1748ab7ccb409eed
      </Router>
    </div>
  );
}

export default App;
