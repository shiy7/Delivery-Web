import React, {Component} from 'react';
import { Descriptions } from 'antd';
import {trackingdata} from './Tracking';
import {globaldata} from "./Processing";
class OrderDetail extends Component {
    render() {
        const {deliverAddress,packageWeight,receiverName,orderNumber} = this.props.info;
        // console.log(this.props.info)
        return (
            <Descriptions title="Package Info" bordered>

                <Descriptions.Item label="Order Number" >
                    {orderNumber}
                </Descriptions.Item>

                <Descriptions.Item label="Receiver Name" >
                    {receiverName}
                </Descriptions.Item>

                <Descriptions.Item label="Package Weight">
                    {packageWeight}
                </Descriptions.Item>

                <Descriptions.Item label="Deliver Address">
                    {deliverAddress}
                </Descriptions.Item>

            </Descriptions>
        );
    }
}

export default OrderDetail;
