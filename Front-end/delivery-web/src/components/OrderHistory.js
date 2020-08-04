import React, {Component} from 'react';
import {Button, Icon, message, Table} from 'antd'


class OrderHistory extends Component {

    state = {
        id: localStorage.getItem("userID"),
        isLoading: true,
        orders: ''
    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const backendUrl = "https://deliver-web-back-end.herokuapp.com";
        const url = '/history?username='+this.state.id;
        fetch(proxyurl+backendUrl+url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    this.setState({
                        idLoading:false,
                        orders: data
                    });
                }
            )
            .catch((err) => {
                console.error(err);
                // message.error('NO Orders');
            });

    }

    goShipping = () => {
        // this.props.handlePrevButton();
        this.props.history.push(`/processing`);
    }

    render() {

        const data = [];
        for (let i = 0; i < this.state.orders.length; i++){
            const order = this.state.orders[i];
            data.push({
                key: i,
                number:order.orderNumber,
                sender:order.senderName,
                receiver: order.receiverName,
                date:order.orderTimestamp.substring(5,7)+'/'+order.orderTimestamp.substring(8,10)+'/'+order.orderTimestamp.substring(0,4),
            })
        }

        const columns = [
            {
                title: 'Order Number',
                dataIndex: 'number',
                width: 200,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                width: 200,
            },
            {
                title: 'Sender',
                dataIndex: 'sender',
            },
            {
                title: 'Receiver',
                dataIndex: 'receiver',
            },
            {
                title: 'Tracking',
                key: 'tracking',
                render: (text, record) =>
                    <a href={"https://delivery-web-front-end.herokuapp.com/tracking/".concat(record.number)}>Tracking</a>
            },
        ];



        return (
            <div>
                <div align='right'>
                    <Button onClick={this.goShipping}
                            style={{textAlign:"right", marginBottom:'20px'}}
                    >Ship my package</Button>
                </div>

                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default OrderHistory;