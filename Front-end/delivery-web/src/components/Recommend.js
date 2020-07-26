import React, {Component} from 'react';
import {Card, Col, Row, Radio} from 'antd';
import {Button, Form} from "antd";
import drone_logo from '../assets/images/drone-icon.png';
import robot_logo from '../assets/images/robot-icon.png';

class RecommendForm extends Component {
     select_option= localStorage.getItem("option");
    state = {
        robot_distance: '',
        robot_cost: '',
        robot_time: '',
        drone_distance: '',
        drone_cost: '',
        drone_time: '',
        route_info: '',
        option: (this.select_option == null) ? "1" : this.select_option,
        value:'',
        loading:true
    }

    goNext = () => {
        if (this.state.option === "1") {
            localStorage.setItem("method","robot");
            localStorage.setItem("cost",this.state.route_info.robotcost);
            localStorage.setItem("distance", this.state.route_info.robotdistance);
            localStorage.setItem("time",this.state.route_info.robottime);
            localStorage.setItem("option","1");
        } else if (this.state.option === "2") {
            localStorage.setItem("method","drone");
            localStorage.setItem("cost",this.state.route_info.dronecost);
            localStorage.setItem("distance", this.state.route_info.dronedistance);
            localStorage.setItem("time",this.state.route_info.dronetime);
            localStorage.setItem("option","2");
        }

        this.props.handleNextButton();
    }

    goBack = () => {
        // props.submittedValues(values);
        // localStorage.clear();
        this.props.handlePrevButton();


    }

    // constructor(props) {
    //     super(props);
    // }



    componentDidMount() {

        const url = '/recommend'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({

                useraddress: localStorage.getItem('user_address'),
                raddress: localStorage.getItem('r_address'),
            }),
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('data ->', data);
                this.setState({route_info: data});
                this.setState({loading: false});
            });
        // this.setState({loading: false})
    }


    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            option: e.target.value,
        });
    };



    render() {

        console.log("address: ", this.props.address);

        return (
            <div>

                <div>
                    <Radio.Group onChange={this.onChange} value={this.state.option} >
                        <Row gutter={16}>
                            <Col span={12}>
                                <img src={robot_logo} className="logo" alt="logo"/>
                                <Card title="Route 1: Robot Delivery" bordered={true} hoverable={true} loading={this.state.loading}>
                                    <p>Distance: {this.state.route_info.robotdistance} km</p>
                                    <p>Cost: ${this.state.route_info.robotcost}</p>
                                    <p>Estimate deliver time: {this.state.route_info.robottime}</p>
                                </Card>
                                <Radio value="1">Option 1: </Radio>

                            </Col>
                            <Col span={12}>
                                <img src={drone_logo} className="logo" alt="logo"/>
                                <Card title="Route 2: Drone Delivery" bordered={true} hoverable={true} loading={this.state.loading}>
                                    <p>Distance: {this.state.route_info.dronedistance} km</p>
                                    <p>Cost: ${this.state.route_info.dronecost}</p>
                                    <p>Estimate deliver time: {this.state.route_info.dronetime}</p>
                                </Card>
                                <Radio value="2">Option 2:</Radio>
                            </Col>

                        </Row>


                    </Radio.Group>
                </div>

                <div className="buttonLayout">
                    <Button type="default" onClick={this.goBack}>
                        Prev
                    </Button>
                    <Button type="primary" onClick={this.goNext}>
                        Next
                    </Button>
                </div>

            </div>
        );


    }
}

const Recommend = Form.create({name: 'Recommend'})(RecommendForm)
export default Recommend;
