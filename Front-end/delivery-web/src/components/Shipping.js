import React, {Component} from 'react';
import {Form, Input, Button, Select, message, Row, Col} from 'antd';
import {API_ROOT} from "../constants";

class ShipForm extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };


    render() {
        const { Option } = Select;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <p className="infor">Sender Information</p>
                <Form  {...formItemLayout} onSubmit={this.handleSubmit}
                       className="ship"
                >
                    <Form.Item label="Name">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input sender name!' }],
                        })(
                            <Input placeholder="Full Name"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="Phone" >
                        {getFieldDecorator('userphone', {
                            rules: [{ required: true, message: 'Please input sender phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Street Address" >
                        {getFieldDecorator('useraddress', {
                            rules: [{ required: true, message: 'Please input sender street address!' }],
                        })(<Input />)}
                    </Form.Item>

                    {/*<Form.Item label="City / State">*/}

                    {/*    <Row gutter={8}>*/}
                    {/*        <Col span={12}>*/}
                    {/*            <Form.Item >*/}
                    {/*                {getFieldDecorator('usercity', {*/}
                    {/*                    rules: [{ required: true, message: 'Please input your City!' }],*/}
                    {/*                })(<input placeholder="City" className="ant-input"/>)}*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*        <Col span={12}>*/}
                    {/*            <Form.Item>*/}
                    {/*                {getFieldDecorator('userstate', {*/}
                    {/*                    rules: [{ required: true, message: 'Please input your State!' }],*/}
                    {/*                })(<input placeholder="State" className="ant-input" />)}*/}
                    {/*            </Form.Item>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</Form.Item>*/}

                    <p className="infor">Receiver Information</p>
                    <Form.Item label="Name">
                        {getFieldDecorator('rname', {
                            rules: [{ required: true, message: 'Please input receiver name!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item name="rphone" label="Phone" rules={[{ required: true }]}>
                        {getFieldDecorator('rphone', {
                            rules: [{ required: true, message: 'Please input receiver phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item name="raddress" label="Address" rules={[{ required: true }]}>
                        {getFieldDecorator('raddress', {
                            rules: [{ required: true, message: 'Please input receiver street address!' }],
                        })(<Input />)}
                    </Form.Item>
                    <p className="infor">Package Information</p>
                    <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                        {getFieldDecorator('size', {
                            rules: [{ required: true, message: 'Please choose package size!' }],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="small">small</Option>
                                <Option value="medium">medium</Option>
                                <Option value="large">large</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
                        {getFieldDecorator('weight', {
                            rules: [{ required: true, message: 'Please input package weight!' }],
                        })(<Input addonAfter={'lb'}/>)}
                    </Form.Item>
                    <Form.Item name="emergency" label="Emergency" rules={[{ required: true }]}>
                        {getFieldDecorator('emergency', {
                            rules: [{ required: true, message: 'Please choose package size!' }],
                        })(
                            <Select
                                placeholder="Select a option and change input text above"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="urgent">urgent</Option>
                                <Option value="slow">not urgent</Option>

                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>

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

        function generateTrackingNumber(number) {
            let i;
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const digits = '0123456789';
            const charactersLength = characters.length;
            for (i = 0; i < 4; i++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            for (i = 0; i < number; i++ ) {

                result += digits.charAt(Math.floor(Math.random() * 10));
            }
            return result;
        }

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log('user name: ', values.username);
                console.log('user phone ', values.userphone);
                console.log('user address: ', values.useraddress);
                console.log('tracking number',generateTrackingNumber(12));

                // Fetch API provides a JavaScript interface for accessing and manipulating
                // parts of the HTTP pipeline, such as requests and responses.
                // It also provides a global fetch() method that provides an easy,
                // logical way to fetch resources asynchronously across the network.

                // fetch(`${API_ROOT}/shipping`, {
                //     method: `POST`,
                //     body: JSON.stringify({
                //         username: values.username,
                //         userphone: values.userphone,
                //         useraddress: values.useraddress,
                //     }),
                // })
                //     .then(response => {
                //         // console.log(response);
                //         if (response.ok) {
                //             return response.text();
                //         }
                //         throw new Error(response.statusText);
                //     })
                //     .then((data) => {
                //         console.log(data);
                //         message.success('Shipping form created successfully!');
                //         // back to login page
                //         console.log(this.props);
                //         this.props.history.push('/Recommend');
                //
                //
                //     })
                //     .catch((err) => {
                //         console.error(err);
                //         message.error('Shipping form failed to created.');
                //     });

            }
        });
    };
}
const Shipping = Form.create({ name: 'shipping' })(ShipForm)
export default Shipping;