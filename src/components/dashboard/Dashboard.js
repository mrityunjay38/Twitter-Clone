import React, { Component } from 'react';
import "../../css/dashboard.scss";
import fire from '../../firebaseConfig/config'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        };
 }

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log(user.uid);
        if(user == null) {
        }
        console.log(this.props.history)
        })
    }

    render(){
        return (
            <section className="dashboard">
            <div className="left-sidebar">
                <h1 style={{color: "white"}}>Profile area</h1>
                <Link to="/">
                    <button onClick={() => fire.auth().signOut()}>Log out!</button>
                </Link>
            </div>
            <div className="middle">
            {/* <Tweet/> */}
            <h1 style={{color: "white"}}>Tweet + Feeds area</h1>
            </div>
            <div className="right-sidebar"><h1 style={{color: "white"}}>Follow/Unfollow snippet</h1></div>
            </section>
        );
    }
}