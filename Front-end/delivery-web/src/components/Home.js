import React, {Component} from 'react';
import bgd from '../assets/images/bgd.jpg'
import {Button, Input} from 'antd';
import { withRouter } from 'react-router-dom';

class Home extends Component {
        goToTracking = () => {

        this.props.history.push(`/tracking`);
    }

    goToLogin (){

        this.props.history.push(`/login`);
    }
    render() {
        let obj = JSON.parse("{\"originAddresses\":[\"780 S Airport Blvd, San Francisco, CA 94128, USA\"],\"destinationAddresses\":[\"1600 Holloway Ave, San Francisco, CA 94132, USA\"],\"rows\":[{\"elements\":[{\"status\":\"OK\",\"duration\":{\"inSeconds\":859,\"humanReadable\":\"14 mins\"},\"durationInTraffic\":null,\"distance\":{\"inMeters\":15456,\"humanReadable\":\"15.5 km\"},\"fare\":null}]}]}")
        console.log(obj.rows[0].elements[0].distance.humanReadable);
        console.log(obj.rows[0].elements[0].duration.humanReadable);
        return (
            <div className="main" >
                <p>WELCOME TO ROBOT DELIVERY SERVICE IN SAN FRANSICO!</p>
                <div>
                    <Button onClick={this.goToTracking}>Tracking:</Button>
                    <Input />

                </div>
                <p>You can also login</p>
                <Button onClick={this.goToLogin.bind(this)}>Login</Button>

            </div>
        );
    }
}

export default Home;