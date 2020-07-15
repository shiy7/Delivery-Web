import React, {Component} from 'react';
import { Form, Input, Button ,Select } from 'antd';
class Shipping extends Component {

    render() {

        const { Option } = Select;

        return (
            <div>
                <p>User information:</p>
            <Form >
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
}

export default Shipping;