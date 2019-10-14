import React, { Component } from 'react';
import "../../css/dashboard.scss";
import fire from '../../firebaseConfig/config'
// import { Link } from 'react-router-dom'
import LeftSidebars from '../sidebars/LeftSidebars';
import { thisTypeAnnotation } from '@babel/types';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: null
        };
 }

    componentDidMount(){
        const user = fire.auth().currentUser;

        if(user == null) {
            this.props.history.push('/');
        }

    }

    render(){
        return (
            <section className="dashboard">
            <LeftSidebars />
            <div className="middle">
            {/* <Tweet/> */}
            <h1 style={{color: "white"}}>Tweet + Feeds area</h1>
            </div>
            <div className="right-sidebar"><h1 style={{color: "white"}}>Follow/Unfollow snippet</h1></div>
            </section>
        );
    }
}
