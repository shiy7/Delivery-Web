import React, {Component} from 'react';
import {Table} from 'antd'



class OrderHistory extends Component {

    render() {
        const columns = [
            {
                title: 'Order Number',
                dataIndex: 'number',
                width: 150,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                width: 150,
            },
            {
                title: '',
                dataIndex: 'address',
            },
        ];

        return (
            <div>
                test2
            </div>
        );
    }
}

export default OrderHistory;