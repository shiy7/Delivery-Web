import React, {Component} from 'react';
import {Button} from "antd";

class Profile extends Component {
    goShipping = () => {
        // this.props.handlePrevButton();
        this.props.history.push(`/processing`);
    }
    render() {
        return (
            <div>
                {/*{this.props.match.params.id}*/}
                {/*{console.log(this.props)}*/}
                <Button onClick={this.goShipping}>Ship my package</Button>
            </div>
        );
    }
}

export default Profile;