import React, {Component} from 'react';
import { Descriptions } from 'antd';
import {trackingdata} from './Tracking';
import {globaldata} from "./Processing";
class OrderDetail extends Component {
    render() {
        // console.log(this.props)
        console.log(trackingdata._currentValue.deliver_address);
        const info = this.props.information;
        console.log(info);
        return (
            <Descriptions title="Package Info" bordered>
                <Descriptions.Item label="Order Number">{trackingdata._currentValue.tracking_number}</Descriptions.Item>
                {/*<Descriptions.Item label="User Name">Tim Tang</Descriptions.Item>*/}
                <Descriptions.Item label="Receiver Name">{trackingdata._currentValue.receiver_name}</Descriptions.Item>
                <Descriptions.Item label="Package Weight">{trackingdata._currentValue.package_weight}</Descriptions.Item>
                {/*<Descriptions.Item label="Payment">{trackingdata._currentValue.payment}</Descriptions.Item>*/}
                <Descriptions.Item label="Deliver Address">{trackingdata._currentValue.deliver_address}</Descriptions.Item>
                <Descriptions.Item label="Pick Up Address">16th Ave, San Francisco, CA 94122</Descriptions.Item>
            </Descriptions>
        );
    }
}

export default OrderDetail;