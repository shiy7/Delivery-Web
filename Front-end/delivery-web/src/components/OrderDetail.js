import React, {Component} from 'react';
import { Descriptions } from 'antd';
import {trackingdata} from './Tracking';
import {globaldata} from "./Processing";
class OrderDetail extends Component {
state = {
    user_name: ''
}
    componentDidUpdate(prevProps, prevState, snapshot) {
        // const user_name = user.username;
        if(this.state.user_name !== this.props.info.user.username){
            this.setState({user_name:this.props.info.user.username})
        }

    }

    render() {
        const {deliverAddress,packageWeight,receiverName,orderNumber,receiverAddress,senderPhone,receiverPhone,packageSize,
            emergency,deliverMethod,estimateDistance,estimateTime,cardNo,money} = this.props.info;

        return (
            <div>
        <Descriptions>
            <Descriptions.Item label="Order Number" >
                {orderNumber}
            </Descriptions.Item>
        </Descriptions>
            <Descriptions title="Package Info" bordered>


                <Descriptions.Item label="Sender Name" >
                    {this.state.user_name}
                </Descriptions.Item>

                <Descriptions.Item label="Sender Address">
                    {deliverAddress}
                </Descriptions.Item>

                <Descriptions.Item label="Sender Phone">
                    {senderPhone}
                </Descriptions.Item>

                <Descriptions.Item label="Receiver Name" >
                    {receiverName}
                </Descriptions.Item>

                <Descriptions.Item label="Receiver Address">
                    {receiverAddress}
                </Descriptions.Item>

                <Descriptions.Item label="Receiver Phone">
                    {receiverPhone}
                </Descriptions.Item>

                <Descriptions.Item label="Package Weight">
                    {packageWeight}
                </Descriptions.Item>

                <Descriptions.Item label="Package Size">
                    {packageSize}
                </Descriptions.Item>

                <Descriptions.Item label="Emergency">
                    {emergency}
                </Descriptions.Item>

                <Descriptions.Item label="Deliver Method">
                    {deliverMethod}
                </Descriptions.Item>

                <Descriptions.Item label="Estimate Distance">
                    {estimateDistance}
                </Descriptions.Item>

                <Descriptions.Item label="Estimate Deliver Time">
                    {estimateTime}
                </Descriptions.Item>

                <Descriptions.Item label="Total payment">
                    {money}
                </Descriptions.Item>

                <Descriptions.Item label="Payment card info">
                    {cardNo}
                </Descriptions.Item>

            </Descriptions>
            </div>
        );
    }
}

export default OrderDetail;
