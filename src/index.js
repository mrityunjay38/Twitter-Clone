import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
=======
import './index.css';
>>>>>>> c3cf5fca63beb6a8979fab7f1748ab7ccb409eed
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from './firebaseConfig/config'

<<<<<<< HEAD

ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker();
=======
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
>>>>>>> c3cf5fca63beb6a8979fab7f1748ab7ccb409eed
