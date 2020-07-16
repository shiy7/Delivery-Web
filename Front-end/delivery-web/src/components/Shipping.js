import React, {Component} from 'react';
import {Form, Input, Button, Select, message} from 'antd';
import {API_ROOT} from "../constants";
class Shipping extends Component {

    render() {
        const { Option } = Select;
        return (
            <div>
                <p>User information:</p>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item name="username" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="userphone" label="Phone" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="useraddress" label="Address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <p>Receiver information:</p>
                <Form.Item name="rname" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="rphone" label="Phone" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="raddress" label="Address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <p>Package Information:</p>
                <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="small">small</Option>
                        <Option value="medium">medium</Option>
                        <Option value="large">large</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="emergency" label="Emergency" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="urgent">urgent</Option>
                        <Option value="slow">not urgent</Option>

                    </Select>
                </Form.Item>
                <Form.Item >

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>

            </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // Fetch API provides a JavaScript interface for accessing and manipulating
                // parts of the HTTP pipeline, such as requests and responses.
                // It also provides a global fetch() method that provides an easy,
                // logical way to fetch resources asynchronously across the network.




            }
        });
    };
}
const Ship = Form.create({ name: 'shipping' })(Shipping)
export default Ship;