import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";

function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" component={Homepage} />
      </Router>
    </div>
  );
}

export default App;
