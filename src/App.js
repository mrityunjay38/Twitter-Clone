import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <header className="App-header">
            <h1>Twitter</h1>
            </header>
        </div>
    </BrowserRouter>
=======
import Homepage from "./components/auth/homepage";

function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" component={Homepage} />
      </Router>
    </div>
>>>>>>> c0caf320b5c9145b4c9eab8f387390beb7c0f486
  );
}

export default App;
