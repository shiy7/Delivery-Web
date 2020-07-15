import React, {Component} from 'react';
import bgd from '../assets/images/bgd.jpg'
import {Button, Input} from 'antd';
class Home extends Component {
    render() {
        return (
            <div className="main" >
                <p>WELCOME TO ROBOT DELIVERY SERVICE IN SAN FRANSICO!</p>
                <div>
                    <Button>Tracking:</Button>
                    <Input />

                </div>
                <p>You can also login</p>
                <Button>Login</Button>

            </div>
        );
    }
}

export default Home;