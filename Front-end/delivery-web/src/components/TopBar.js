import React from 'react';
import { Icon } from 'antd';
import logo from '../assets/images/icon.png';
import {HomeFilled} from  '@ant-design/icons';
import Home from './Home';
import Redirect from "react-router-dom/Redirect";

class TopBar extends React.Component {

    getHome (){

        // return <Redirect to="/home/"/>;
        return <Home />
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <span className="App-title">Robot Delivery Service</span>
                <HomeFilled className = "home" onClick = {(e)=>this.getHome()}/>
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a> : null }

            </header>
        );
    }


}

export default TopBar;