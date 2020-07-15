import React from 'react';
import { Button,Icon } from 'antd';
import logo from '../assets/images/icon.png';
import { Link } from 'react-router-dom';
import {HomeFilled} from  '@ant-design/icons';
import Home from './Home';
import Redirect from "react-router-dom/Redirect";

class TopBar extends React.Component {

    getHome = e =>{

        return <Redirect to="/home"/>;
        // return <Home />
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <span className="App-title">Robot Delivery Service</span>
                {/*<HomeFilled className = "home" onClick = {this.getHome}/>*/}
                {/*<Button  onClick = {this.getHome}>button</Button>*/}
                <Link to="/home" className = "home">Home</Link>
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a> : null }

            </header>
        );
    }


}

export default TopBar;