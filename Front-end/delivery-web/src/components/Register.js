import React from 'react';
import { Form, Input, Button,message } from 'antd';
import { Link  } from 'react-router-dom';
import { API_ROOT } from '../constants';


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    render() {
        // console.log(this.props.form);
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
            <div style={{marginBottom: 10, fontSize:20, fontWeight:"bold",marginLeft:100}}
                 className= "welcomeReg"
            >
                Welcome to Register!
            </div>
            <Form  {...formItemLayout}
                   onSubmit={this.handleSubmit}
                   className="register"
            >
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                {/*<Form.Item*/}
                {/*    label="Name"*/}
                {/*    rules={[{ required: true, message: 'Please input your Name!' }]}*/}
                {/*>*/}
                {/*    <Input placeholder="First" style={{ width: '50%' }} />*/}
                {/*    <Input placeholder="Last" style={{width: '50%'}} />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    name="phone"*/}
                {/*    label="Phone Number"*/}
                {/*    rules={[{ required: true, message: 'Please input your phone number!' }]}*/}
                {/*>*/}
                {/*    <Input style={{ width: '100%' }} />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    label="Address"*/}
                {/*    rules={[{ required: true, message: 'Please input your home address!' }]}*/}
                {/*>*/}
                {/*    <Input style={{ width: '100%' }}*/}
                {/*            placeholder="Street Address"*/}
                {/*    />*/}
                {/*    <Input style={{width:'50%'}}*/}
                {/*           placeholder="City"*/}
                {/*    />*/}
                {/*    <Input style={{width:'50%'}}*/}
                {/*            placeholder="State / Province"*/}
                {/*    />*/}
                {/*    <Input style={{width: '50%', float:'left'}}*/}
                {/*           placeholder= "Zip Code"*/}
                {/*    />*/}
                {/*</Form.Item>*/}

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p>I already have an account, go back to <Link to="/login">login</Link></p>
                </Form.Item>
            </Form>
            </div>
        );
    }

    handleSubmit = e => {
        //console.log(this.props.form);

        // stop http request, not refresh the page
        e.preventDefault();

        // // get the key
        // console.log(this.props.form.getFieldValue());
        // // get all three values
        // console.log(this.props.form.getFieldsValue());

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const url = '/registration'
                fetch(url,{
                    method: `POST`,
                    headers: {
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                })
                    .then(response => {
                    // console.log(response);
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error(response.statusText);
                })
                    .then((data) => {
                        console.log(data);
                        message.success('Registration succeed!');
                        // back to login page
                        console.log(this.props);
                        this.props.history.push('/login');


                    })
                    .catch((err) => {
                        console.error(err);
                        message.error('Registration failed.');
                    });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        // console.log('--> ', value);
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        // console.log('11 -> ', rule);
        // console.log('12 -> ', value);

        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props
        // console.log('21 -> ', rule);
        // console.log('22 -> ', value);

        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
}

const Register = Form.create({ name: 'register' })(RegistrationForm)

export default Register;
