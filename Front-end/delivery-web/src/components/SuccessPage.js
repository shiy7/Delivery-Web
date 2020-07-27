import React, {Component} from 'react';
import {Button, Result} from "antd";
import {withRouter} from "react-router-dom";

class SuccessPage extends Component {

goDashBoard = () => {
    this.props.history.push(`/dashboard`);

}
    render() {
        return (

            <Result
                status="success"
                title='Success! Your package is on the way!'
                subTitle=''
                extra={[
                    <p>Success! Your package is on the way! Your tracking number is {localStorage.getItem("tracking")}</p>,
                    <Button type="primary" key="dashboard" onClick={this.goDashBoard}>
                        Back to dashboard
                    </Button>
                    // <Button key="buy">Buy Again</Button>,
                ]}
            />

        );
    }
}

export default withRouter(SuccessPage);