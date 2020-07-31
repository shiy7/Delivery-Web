import React, {Component} from 'react';
import {Button, Form, Input, message, Popconfirm} from "antd";

class Profile extends Component {


    constructor() {
        super();
        this.state = {
            id: localStorage.getItem("userID"),
            password: '*******',
            newPassword:'',
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
            disable2: 'disabled',
            editable: !prevState.editable
        }))
    }

    cancel = () => {
        const tmp = localStorage.getItem("userID");
        this.setState(prevState => ({
            id: tmp,
            editable: !prevState.editable,
            disable: ' ',
            disable2: ' ',
            pointerEvent: 'none',
            border: '0px',
        }))
    }

    save = () => {
        const oldID = this.state.id;
        const newID = document.getElementById("userID").value;
        this.setState(prevState => ({
            id: newID,
            editable: !prevState.editable,
            disable: ' ',
            disable2: ' ',
            pointerEvent: 'none',
            border: '0px',
        }), () => {
            // localStorage.setItem("userID", this.state.id)
        })

        // save new ID to DB
        console.log(oldID)
        console.log(newID)
        const url = '/updateID/'+localStorage.getItem("userID");
        fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: newID
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(response.stateText);
            })
            .then(data => {
                    console.log(data);
                    localStorage.setItem("userID", newID);
                    // this.props.handleLoginSucceed(values.username);
                    message.success('Update username success!');
                }
            )
            .catch((err) => {
                console.error(err);
                message.error('Fail to update username');
            });
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
            disable: 'disabled',
            editable2: !prevState.editable,
            changePW: !prevState.changePW,
        }))
    }

    cancel2 = () => {
        this.setState(prevState => ({
            password: '*******',
            editable2: !prevState.editable2,
            disable2: ' ',
            disable: ' ',
            pointerEvent2: 'none',
            border2: '0px',


        }))
    }

    save2 = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                // compare password with original password
                let stageSuccess = false;
                let headers = new Headers();
                // console.log(oldPwd);
                headers.append('Authorization', 'Basic ' + btoa(localStorage.getItem("userID") + ":" + values.oldPassword));
                fetch(`/login`, {
                    method: `GET`,
                    headers:headers,
                })
                    .then(response => {
                        // console.log(response);
                        if (response.ok) {
                            stageSuccess = true;
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    // .then(data => data.json())
                    .then(data => {
                        console.log(data);
                        const url = '/updatePassword/' + localStorage.getItem("userID");
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Access-Control-Allow-Origin': 'http://localhost:3000',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                password: values.newPassword
                            })
                        })
                            .then(response => response.text())
                            .then(data => {
                                    console.log(data);
                                    // this.props.handleLoginSucceed(values.username);
                                this.setState(prevState => ({
                                    password: '*******',
                                    editable2: !prevState.editable2,
                                    disable2: ' ',
                                    disable: ' ',
                                    pointerEvent2: 'none',
                                    border2: '0px',
                                }))
                                    message.success('Update password success!');
                                }
                            )
                            .catch((err) => {
                                console.error(err);
                                message.error('Fail to update password');
                            });
                        // this.props.history.push(`/dashboard`);
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error('Password not match!');
                    });
                console.log(stageSuccess);


            }
        });


    }

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    comparePassword(){


    }


    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
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


                <div>
                    <h1>Profile</h1>
                    <Form onSubmit = {this.save2}
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
                                    id="password"
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
                            <Form.Item label="Original Password">
                                {getFieldDecorator('oldPassword', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your original password!',
                                        },
                                        // {
                                        //     validator: this.compareToCurPassword(),
                                        // },
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
                                        {getFieldDecorator('newPassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                // {
                                                //     validator: this.validateToNextPassword,
                                                // },
                                            ],
                                        })(<Input.Password id="newPassword"style={{width: 'auto', float: 'left',}}/>)}
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