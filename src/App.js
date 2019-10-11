import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";
import login from './components/auth/login';
import register from './components/auth/register';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
