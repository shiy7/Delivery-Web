import React, {Component} from 'react';
import {Button, Input} from 'antd';

const {Search} = Input;


class Home extends Component {
    goToTracking = () => {
        this.props.history.push(`/tracking`);
    }

    render() {
        // let obj = JSON.parse("{\"originAddresses\":[\"780 S Airport Blvd, San Francisco, CA 94128, USA\"],\"destinationAddresses\":[\"1600 Holloway Ave, San Francisco, CA 94132, USA\"],\"rows\":[{\"elements\":[{\"status\":\"OK\",\"duration\":{\"inSeconds\":859,\"humanReadable\":\"14 mins\"},\"durationInTraffic\":null,\"distance\":{\"inMeters\":15456,\"humanReadable\":\"15.5 km\"},\"fare\":null}]}]}")
        // console.log(obj.rows[0].elements[0].distance.humanReadable);
        // console.log(obj.rows[0].elements[0].duration.humanReadable);
        return (
            <div className="main">
                <div className="background">
                    <p className="welcome">WELCOME TO ROBOT DELIVERY SERVICE IN SAN FRANSICO!</p>
                    <div>
                        <Input
                            placeholder="Please enter tracking number"
                            size="large"
                            style={{width: 800}}
                            // onSearch={value => console.log(value)}
                            // onSearch={this.goToTracking()}
                        />
                        <Button onClick={this.goToTracking}
                                size="large"
                                // className="track"
                                className = "ant-btn ant-input-search-button ant-btn-primary ant-btn-lg"
                        >
                            Tracking
                        </Button>
                    </div>
                </div>

                {/*<div className="body">*/}
                {/*    <p>You can also login</p>*/}
                {/*    <Button onClick={this.goToLogin.bind(this)}*/}
                {/*            className="button"*/}
                {/*    >Login</Button>*/}
                {/*</div>*/}

            </div>
        );
    }
}

export default Home;