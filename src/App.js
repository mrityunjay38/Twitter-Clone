import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import Homepage from "./components/auth/homepage";
import UserRegistration from "./components/auth/UserRegistration";
import Login from "./components/auth/Login";



function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/Index" component={Homepage} />
      <Route path="/Login" component={Login} />
      <Route path="/UserRegistration" component={UserRegistration} />

      </Router>
    </div>
  );
}

export default App;
