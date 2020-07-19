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

    goToLogin = () => {
        console.log(this.props)
        //this.props.history.push(`/login`);
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/home" className="App-title">Robot Delivery Service</Link>
                {/*<HomeFilled className = "home" onClick = {this.getHome}/>*/}
                {/*<Button  onClick = {this.getHome}>button</Button>*/}
                {/*<Link to="/home" className = "home">Home</Link>*/}
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout} >
                        <Icon type="logout"/>{' '}Logout
                    </a> : <Link to="/login" className="login">Log in / Register</Link>}
            </header>
        );
    }


}

export default TopBar;