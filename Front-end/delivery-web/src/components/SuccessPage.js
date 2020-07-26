import React, {Component} from 'react';
import {Button, Card, Col, Radio, Row} from "antd";
import robot_logo from "../assets/images/robot-icon.png";
import drone_logo from "../assets/images/drone-icon.png";

class SuccessPage extends Component {

goDashBoard = () => {
    this.props.history.push(`/dashboard`);

}
    render() {
        return (
            <div>


                <p>Success! Your package is on the way! Your tracking number is {localStorage.getItem("tracking")}</p>
                <Button onClick={this.goDashBoard}>Back to dashboard</Button>
                {/*<Button>New order</Button>*/}
            </div>
        );
    }
}

export default SuccessPage;