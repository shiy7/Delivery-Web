import React, {Component} from 'react';
import {Button, Card, Col, Radio, Row} from "antd";
import {withRouter} from "react-router-dom";

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

export default withRouter(SuccessPage);