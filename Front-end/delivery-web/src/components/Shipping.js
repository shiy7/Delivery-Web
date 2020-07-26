import React, {Component} from 'react';
import {Form, Input, Button, Select, message, Row, Col} from 'antd';
import { withRouter } from "react-router-dom";
import {API_ROOT} from "../constants";
class ShipForm extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    validateInput = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.submittedValues(values);
                this.props.handleNextButton();
            }else{
                console.log(err);
            }
        });
    }

    // componentDidMount() {
    //     if(localStorage.getItem("user_name") !== null){
    //         value = localStorage.getItem("user_name");
    //     }
    // }

    toDashboard = ()=>{
        this.props.history.push(`/dashboard`);
    }
    render() {

        // console.log(this.state.useraddress);
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


        const u_name = localStorage.getItem("user_name");
        const u_phone = localStorage.getItem("user_phone");
        const u_address = localStorage.getItem("user_address");
        const r_name = localStorage.getItem("r_name");
        const r_phone = localStorage.getItem("r_phone");
        const r_address = localStorage.getItem("r_address");
        const size = localStorage.getItem("size");
        const emergency = localStorage.getItem("emergency");
        const weight = localStorage.getItem("weight");

        return (
            <div>
                <p className="infor">Sender Information</p>
                <Form  {...formItemLayout} onSubmit={this.validateInput}
                       className="ship"
                >
                    <Form.Item label="Name">
                        {getFieldDecorator('username', {
                            initialValue:u_name,
                            rules: [{ required: true, message: 'Please input sender name!' }],
                        })(
                            <Input placeholder="Full Name" />,
                        )}
                    </Form.Item>
                    <Form.Item label="Phone" >
                        {getFieldDecorator('userphone', {
                            initialValue:u_phone,
                            rules: [{ required: true, message: 'Please input sender phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Street Address" >
                        {getFieldDecorator('useraddress', {
                            initialValue:u_address,
                            rules: [{ required: true, message: 'Please input sender street address!' }],
                        })(<Input />)}
                    </Form.Item>

                    <p className="infor">Receiver Information</p>
                    <Form.Item label="Name">
                        {getFieldDecorator('rname', {
                            initialValue:r_name,
                            rules: [{ required: true, message: 'Please input receiver name!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item name="rphone" label="Phone" rules={[{ required: true }]}>
                        {getFieldDecorator('rphone', {
                            initialValue:r_phone,
                            rules: [{ required: true, message: 'Please input receiver phone number!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item name="raddress" label="Address" rules={[{ required: true }]}>
                        {getFieldDecorator('raddress', {
                            initialValue:r_address,
                            rules: [{ required: true, message: 'Please input receiver street address!' }],
                        })(<Input />)}
                    </Form.Item>
                    <p className="infor">Package Information</p>
                    <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                        {getFieldDecorator('size', {
                            initialValue:size,
                            rules: [{ required: true, message: 'Please choose package size!' }],
                        })(
                            <Select
                                placeholder="Select a option"
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
                            initialValue:weight,
                            rules: [{ required: true, message: 'Please input package weight!' }],
                        })(<Input addonAfter={'lb'}/>)}
                    </Form.Item>
                    <Form.Item name="emergency" label="Emergency" rules={[{ required: true }]}>
                        {getFieldDecorator('emergency', {
                            initialValue:emergency,
                            rules: [{ required: true, message: 'Please choose package size!' }],
                        })(
                            <Select
                                placeholder="Select a option"
                                // onChange={onGenderChange}
                                allowClear
                            >
                                <Option value="urgent">urgent</Option>
                                <Option value="slow">not urgent</Option>

                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>

                        <Button type="default" onClick={this.toDashboard}>
                            Go back
                        </Button>

                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        );
    }

}
const Shipping = Form.create({ name: 'shipping' })(ShipForm)
export default withRouter(Shipping);
