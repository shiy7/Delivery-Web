import React, {Component} from 'react';
import {Button} from "antd";
class DashBoard extends Component {
    goToShipping = () => {
    // console.log(1);
        // return <NavLink  to="/shipping">ship</NavLink>;
        console.log(this.props.history);
        this.props.history.push(`/shipping`);
        // this.props.user = "abc123";
    }
    render() {
        return (
            <div>
                    {/*<NavLink  to="/shipping">ship</NavLink>*/}
                    <Button >View my order</Button>
                    <Button onClick={this.goToShipping}>Ship my items</Button>
            </div>
        );
    }
}

export default DashBoard;