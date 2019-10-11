import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" exact component={Homepage} />
      <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
