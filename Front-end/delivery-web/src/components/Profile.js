import React, {Component} from 'react';
import {Button, Form, Input, Popconfirm} from "antd";

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
            disable: ' '
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
        document.getElementById("userID").value = localStorage.getItem("userID");
        this.setState(prevState => ({
            editable: !prevState.editable,
            disable: ' ',
            pointerEvent: 'none',
            border: '0px',
        }))
        // this.inputChange(localStorage.getItem("userID"))

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const tmp = document.getElementById("userID").value;
    //     if (tmp !== localStorage.getItem("userID")){
    //
    //     }
    // }

    save = () => {
        const newID = document.getElementById("userID").value;
        this.setState(prevState => ({
            id: newID,
            editable: !prevState.editable,
            disable: ' ',
            pointerEvent: 'none',
            border: '0px',
        }),()=> {localStorage.setItem("userID", this.state.id)})

    }

    // inputChange = (event) => {
    //     this.setState({
    //         id: event
    //     })
    // }

    render() {


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
                            <Input
                                defaultValue={this.state.id}
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

                        <Form.Item label="Password">
                            <Input
                                defaultValue={this.state.password}

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
                            <a style={{marginRight: 8}}>
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
                    </Form>


                </div>

            </div>
        );
    }
}

export default Profile;