import React, {Component} from 'react';
import {Button, Input, message, Row, Col, Icon} from 'antd';
import robot from '../assets/images/robot.png';
import drone from '../assets/images/drone.png';

const {Search} = Input;


class Home extends Component {
    state = {
        tracking: null
    }
    goToTracking = () => {
        // localStorage.setItem("trackingNumber",this.state.tracking)
        // const tracking = ${this.state.tracking};
        if (this.state.tracking == null) {
            message.error('Input needed.');
        } else {
            this.props.history.push(`/tracking/${this.state.tracking}`);
        }

    }
    handleChange = e => {
        const {value} = e.target;
        this.setState({tracking: value});
        // this.state.tracking = e.target.value;
        // console.log(e.target.value);
    }

    // componentDidMount() {
    //     this.props.isLoggedIn
    // }

    render() {
        // console.log(this.props.isLoggedIn);
        console.log(localStorage.getItem("userID"));
        // let obj = JSON.parse("{\"originAddresses\":[\"780 S Airport Blvd, San Francisco, CA 94128, USA\"],\"destinationAddresses\":[\"1600 Holloway Ave, San Francisco, CA 94132, USA\"],\"rows\":[{\"elements\":[{\"status\":\"OK\",\"duration\":{\"inSeconds\":859,\"humanReadable\":\"14 mins\"},\"durationInTraffic\":null,\"distance\":{\"inMeters\":15456,\"humanReadable\":\"15.5 km\"},\"fare\":null}]}]}")
        // console.log(obj.rows[0].elements[0].distance.humanReadable);
        // console.log(obj.rows[0].elements[0].duration.humanReadable);
        return (
            <div className="main">
                <div className="background">
                    <p className="welcome">WELCOME TO ROBOT DELIVERY SERVICE IN SAN FRANSICO!</p>
                    <div className="track">
                        <Input
                            placeholder="Please enter tracking number"
                            size="large"
                            style={{width: 800}}
                            onChange={this.handleChange}
                            // onSearch={value => console.log(value)}
                            // onSearch={this.goToTracking()}
                        />
                        <Button onClick={this.goToTracking}
                                size="large"
                                className="ant-btn ant-input-search-button ant-btn-primary ant-btn-lg"
                        >
                            Tracking
                        </Button>
                    </div>
                    <div className="homeFeature">
                        <h2 >Main Features</h2>
                        <div>
                            <Row>
                                <Col span={8}>
                                    <div className="factage">
                                        <p className="number">
                                            1
                                        </p>
                                        <h3>
                                            Dashboard
                                        </h3>
                                       Go to processing page to start an oder.
                                        Check your order history.

                                    </div>
                                </Col>

                                <Col span={8}>
                                    <div className="factage">
                                        <p className="number">
                                            2
                                        </p>
                                        <h3>
                                            Processing
                                        </h3>
                                        Create an new order. You will need sender's and receiver's name, phone number, and home address.

                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="factage">
                                        <p className="number">
                                            3
                                        </p>
                                        <h3>
                                            Tracking
                                        </h3>
                                        Find your order status and its current address with Google Map.
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="homeStep">
                            <h2 > Steps to order</h2>
                            <h4>Follow these 5 steps to create an order after you log in. </h4>
                            <div className="innerStep">
                                <ol className="circle">
                                    <li>
                                        <Icon type="form" style={{fontSize:"100px"}} className="homeIcon"/>
                                        <h3>Shipping Form</h3>
                                        <p>Add shipping information</p>
                                    </li>
                                    <li>
                                        <Icon type="robot" style={{fontSize:"100px"}} className="homeIcon"/>
                                        <h3>Delivery Method</h3>
                                        <p>Choose delivery method: less cost / time</p>
                                    </li>
                                    <li>
                                        <Icon type="check-square" style={{fontSize:"100px"}} className="homeIcon"/>
                                        <h3>Confirmation</h3>
                                        <p style={{wordWrap:"break-word"}}>Confirm order information</p>
                                    </li>
                                    <li>
                                        <Icon type="credit-card" style={{fontSize:"100px"}} className="homeIcon"/>
                                        <h3>Payment</h3>
                                        <p>Pay with your order</p>
                                    </li>
                                    <li>
                                        <Icon type="smile" style={{fontSize:"100px"}} className="homeIcon"/>
                                        <h3>Order Finish </h3>
                                        <p>Get your tracking number</p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="homeImage">
                            <h2 > Our Robot & Drone</h2>
                            <img src={robot} alt="Robot Delivery" width="22%" height="350px"/>;
                            <img src={drone} alt="Drone Delivery" width="30%" height="300px"/>;
                        </div>
                    </div>

                </div>

            </div>
        );


    }
}

export default Home;
