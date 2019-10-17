import React, { Component } from 'react';
import "../../css/right-sidebar.scss";
import Search from "../Search";

export default class RightSidebar extends Component {
    render(){
        return (
            <div>
            <Search />
            </div>
        );
    }
}