import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/Homepage.jsx";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard'
import UserProfileWithTweets from './components/profile/UserProfileWithTweets';
import UserProfileWithReplies from './components/profile/UserProfileWithReplies'
import AddNewTweet from './components/tweets/AddNewTweets'
import EditUserDetails from './components/profile/user/EditUserDetails';
import UserProfileWithMedia from './components/profile/UserProfileWithMedia';
import UserProfileWithLikes from './components/profile/UserProfileWithLikes';
import OnBoard from './components/dashboard/OnBoard';
import FollowingAndFollower from './components/followingAndFollower/FollowingAndFollower.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />       
          <Route exact path="/user/:uid/onboarding" component={OnBoard}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/user/:id" component={UserProfileWithTweets} />
          <Route exact path="/user/:id/with_replies" component={UserProfileWithReplies}/>
          <Route exact path="/user/:id/media" component={UserProfileWithMedia} />
          <Route exact path="/user/:id/likes" component={UserProfileWithLikes}/>
          <Route exact path="/user/:id/settings" component={EditUserDetails}/>
          <Route exact path="/user/:id/addTweet" component={AddNewTweet} />
          <Route exact path="/:username/following" component={FollowingAndFollower} />
          <Route exact path="/:username/follower" component={FollowingAndFollower} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
