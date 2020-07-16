import React, {Component} from 'react';
import {Button} from "antd";
class DashBoard extends Component {
    goToShipping = () => {
    // console.log(1);
        // return <NavLink  to="/shipping">ship</NavLink>;
        this.props.history.push(`/shipping`);
        // this.props.user = "abc123";
    }
    render() {
        return (
            <div>
                    {/*<NavLink  to="/shipping">ship</NavLink>*/}
                    <Button onClick={this.goToShipping}>View my order</Button>
                    <Button>Ship my items</Button>
            </div>
        );
    }
}

export default DashBoard;