import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyAICrLGtnbXcFpQ6shi67XVpXjHw_F8AUI",
    authDomain: "twitter-clone-ee4d9.firebaseapp.com",
    databaseURL: "https://twitter-clone-ee4d9.firebaseio.com",
    projectId: "twitter-clone-ee4d9",
    storageBucket: "twitter-clone-ee4d9.appspot.com",
    messagingSenderId: "829574997512",
    appId: "1:829574997512:web:784244cb354ba01031d3bd",
    measurementId: "G-G9EG7S4PHL"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;