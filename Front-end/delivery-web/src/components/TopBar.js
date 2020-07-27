import React from 'react';
import { Button,Icon, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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

    goToLogin = () => {
        console.log(this.props)
        //this.props.history.push(`/login`);
    }


    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                        <Link to="/dashboard"><Icon type="user"/> {' '} User</Link>

                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/home" className="App-title">Robot Delivery Service</Link>
                {/*<HomeFilled className = "home" onClick = {this.getHome}/>*/}
                {/*<Button  onClick = {this.getHome}>button</Button>*/}
                {/*<Link to="/home" className = "home">Home</Link>*/}
                {this.props.isLoggedIn ?

                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <Icon type="menu" /> <DownOutlined />
                        </a>
                    </Dropdown>

                    : <Link to="/login" className="login">Log in / Register</Link>}
            </header>
        );
    }


}

export default TopBar;