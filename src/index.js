import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from './firebaseConfig/config'


ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker();
