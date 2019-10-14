import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/homepage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
// import Register from './components/auth/Register';
// import firebaseConfig from './firebaseConfig/config';
import Dashboard from './components/dashboard/Dashboard'
import UserProfileWithTweets from './components/profile/UserProfileWithTweets';
import UserProfileWithReplies from './components/profile/UserProfileWithReplies'
import AddNewTweet from './components/tweets/AddNewTweets'
import EditUserDetails from './components/profile/user/EditUserDetails';
import UserProfileWithMedia from './components/profile/UserProfileWithMedia';
import UserProfileWithLikes from './components/profile/UserProfileWithLikes';
import onBoard from './components/dashboard/onBoard';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        
        <Route path="/user/:uid/onboarding" component={onBoard}/>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/user/:id" component={UserProfileWithTweets} />
        <Route path="/user/:id/with_replies" component={UserProfileWithReplies}/>
        <Route path="/user/:id/media" component={UserProfileWithMedia} />
        <Route path="/user/:id/likes" component={UserProfileWithLikes}/>
        <Route path="/user/:id/settings" component={EditUserDetails}/>
        <Route path="/user/:id/addTweet" component={AddNewTweet} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
