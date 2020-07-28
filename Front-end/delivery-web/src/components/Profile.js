import React, {Component} from 'react';
import {Button, Form, Input, message, Popconfirm} from "antd";

class Profile extends Component {
    goShipping = () => {
        // this.props.handlePrevButton();
        this.props.history.push(`/processing`);
    }

    constructor() {
        super();
        this.state = {
            id: localStorage.getItem("userID"),
            password: '*******',
            pointerEvent: 'none',
            border: '0px',
            editable: 'true',
            disable: ' ',
            pointerEvent2: 'none',
            border2: '0px',
            editable2: 'true',
            disable2: ' ',
            changePW: true,
            confirmDirty: false,
        }
        this.edit = this.edit.bind(this);
    }

    edit = () => {
        this.setState(prevState => ({
            pointerEvent: 'auto',
            border: '1px solid #ced4da',
            disable: 'disabled',
            editable: !prevState.editable
        }))
    }

    cancel = () => {
        const tmp = localStorage.getItem("userID");
        this.setState(prevState => ({
            id: tmp,
            editable: !prevState.editable,
            disable: ' ',
            pointerEvent: 'none',
            border: '0px',
        }))
    }

    save = () => {
        const newID = document.getElementById("userID").value;
        this.setState(prevState => ({
            id: newID,
            editable: !prevState.editable,
            disable: ' ',
            pointerEvent: 'none',
            border: '0px',
        }), () => {
            localStorage.setItem("userID", this.state.id)
        })

        // save new ID to DB

    }

    onChange = (e) => {
        this.setState({
            id: e.target.value
        }, () => {
            console.log(this.state.id)
        });
    }

    edit2 = () => {
        this.setState(prevState => ({
            password: ' ',
            pointerEvent2: 'auto',
            border2: '1px solid #ced4da',
            disable2: 'disabled',
            editable2: !prevState.editable,
            changePW: !prevState.changePW,
        }))
    }

    cancel2 = () => {
        this.setState(prevState => ({
            password: '*******',
            editable2: !prevState.editable2,
            disable2: ' ',
            pointerEvent2: 'none',
            border2: '0px',
        }))
    }

    save2 = () => {
        this.setState(prevState => ({
            password: '*******',
            editable2: !prevState.editable,
            disable2: ' ',
        }))

        // to do save new PW into DB

    }

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToCurPassword = (rule, value, callback) => {
        const url = '/history?username='.concat(this.state.id)
        fetch(url, {
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
                    const oldPW = data.password;
                    if (value && value !== oldPW) {
                        callback('Your original password is wrong');
                    } else {
                        callback();
                    }
                }
            )
            .catch((err) => {
                console.error(err);
                message.error('Password is wrong');
            });

    }

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('new password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


    render() {
        console.log(this.props.form)
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 10},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div>
                {/*{this.props.match.params.id}*/}
                {/*{console.log(this.props)}*/}
                <Button onClick={this.goShipping}>Ship my package</Button>

                <div>
                    <h1>Profile</h1>
                    <Form
                        {...formItemLayout}
                    >
                        <Form.Item label="user ID">
                            <Input onChange={this.onChange}
                                   value={this.state.id}
                                   id="userID"
                                   style={{
                                       pointerEvents: this.state.pointerEvent,
                                       border: this.state.border,
                                       width: 'auto',
                                       float: 'left'
                                   }}
                            />
                            {this.state.editable ?
                                <Button onClick={this.edit} disabled={this.state.disable !== ' '}>
                                    Edit
                                </Button> :
                                <span>
                                    <a style={{marginRight: 8}} onClick={this.save}>
                                        Save
                                    </a>
                                    <Popconfirm title="Sure to cancel?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={this.cancel}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            }
                        </Form.Item>

                        {this.state.editable2 ?
                            <Form.Item label="Original Password">
                                <Input
                                    value={this.state.password}
                                    style={{
                                        pointerEvents: this.state.pointerEvent2,
                                        border: this.state.border2,
                                        width: 'auto',
                                        float: 'left',
                                    }}
                                />
                                <Button onClick={this.edit2} disabled={this.state.disable2 !== ' '}>
                                    Edit
                                </Button>
                            </Form.Item> :
                            <Form.Item label="Original Password" hasFeedback>
                                {getFieldDecorator('old password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your original password!',
                                        },
                                        {
                                            validator: this.compareToCurPassword(),
                                        },
                                    ],
                                })(<Input.Password style={{width: 'auto', float: 'left',}}/>)}
                                <span>
                                    <a style={{marginRight: 8}} onClick={this.save2}>
                                        Save
                                    </a>
                                    <Popconfirm title="Sure to cancel?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={this.cancel2}>
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            </Form.Item>
                        }
                        {
                            this.state.editable2 ? null :
                                <div>
                                    <Form.Item label="New Password" hasFeedback>
                                        {getFieldDecorator('new password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password style={{width: 'auto', float: 'left',}}/>)}
                                    </Form.Item>
                                    <Form.Item label="Confirm New Password" hasFeedback>
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
                                        })(<Input.Password onBlur={this.handleConfirmBlur}
                                                           style={{width: 'auto', float: 'left',}}
                                        />)}
                                    </Form.Item>
                                </div>
                        }
                    </Form>


                </div>

            </div>
        );
    }
}

export default Form.create()(Profile);