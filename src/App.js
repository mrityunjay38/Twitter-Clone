import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Homepage from "./components/auth/Homepage";
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard'
import UserProfileWithTweets from './components/profile/UserProfileWithTweets';
import EditUserDetails from './components/profile/user/EditUserDetails';
import OnBoard from './components/dashboard/OnBoard';
import FollowingAndFollower from './components/followingAndFollower/FollowingAndFollower.js';
import DisplayTweets from './components/tweets/DisplayTweets';


{/* <Route path="" render={props => } */}
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />       
          <Route path="/:username/onboarding" component={OnBoard}/>
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/:id" component={UserProfileWithTweets} />
          <Route path="/:id/with_replies" component={UserProfileWithTweets} />
          <Route path="/:id/media" component={UserProfileWithTweets} />
          <Route path="/:id/likes" component={UserProfileWithTweets} />
          <Route exact path="/settings/:username/profile" component={EditUserDetails} />
          <Route path="/:username/status/:id" component={DisplayTweets} />
          <Route exact path="/:username/following" component={FollowingAndFollower} />
          <Route path="/:username/follower" component={FollowingAndFollower} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;