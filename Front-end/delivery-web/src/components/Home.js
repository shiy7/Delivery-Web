import React, {Component} from 'react';
import bgd from '../assets/images/bgd.jpg'
import {Button, Input} from 'antd';
import Login from "./Login"
import getLogin from "./Main.js"
class Home extends Component {
    goToTracking = () => {

        this.props.history.push(`/tracking`);
    }
    goToLogin = () => {

        return <Login/>;
    }
    render() {

        return (
            <div className="main" >
                <p>WELCOME TO ROBOT DELIVERY SERVICE IN SAN FRANSICO!</p>
                <div>
                    <Button onClick={this.goToTracking}>Tracking:</Button>
                    <Input />

                </div>
                <p>You can also login</p>
                <Button onClick={getLogin}>Login</Button>

            </div>
        );
    }
}

export default Home;