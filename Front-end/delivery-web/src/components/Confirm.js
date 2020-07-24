import React, {Component} from 'react';
import {Input, Descriptions, Button, Icon, Col, Row} from 'antd';


class Confirm extends Component {
    state = {
        username: localStorage.getItem("user_name"),
        userphone: localStorage.getItem("user_phone"),
        useraddress: localStorage.getItem("user_address"),
        rname: localStorage.getItem("r_name"),
        rphone: localStorage.getItem("r_phone"),
        raddress: localStorage.getItem("r_address"),
        size: localStorage.getItem("size"),
        emergency: localStorage.getItem("emergency"),
        weight: localStorage.getItem("weight"),
        method: localStorage.getItem("method"),
        time: localStorage.getItem("time"),
        cost: localStorage.getItem("cost"),
        distance: localStorage.getItem("distance"),
        edit:"readOnly"
    }

    goNext = () => {
        this.props.handleNextButton();
    }

    goBack = () => {
        this.props.handlePrevButton();

    }


    render() {

        return (
            <div>
                <div>

                    {/*<Button icon="edit" size="large" onClick={this.change.bind(this)}/>*/}
                    {/*<Input defaultValue="test" readOnly className="input"/>*/}

                    <Descriptions title="Sender Information" bordered={true} className="confirmInfor">
                        <Descriptions.Item label="Name" style={{}}>
                            {this.state.username}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {this.state.userphone}
                        </Descriptions.Item>

                        <Descriptions.Item label="Address">
                            {this.state.useraddress}
                        </Descriptions.Item>
                    </Descriptions>

                    <Descriptions title="Receiver Information" bordered={true} className="confirmInfor">
                        <Descriptions.Item label="Name">
                            {this.state.rname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {this.state.rphone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {this.state.raddress}

                            {/*<Input type='text'*/}
                            {/*       defaultValue={this.state.raddress}*/}
                            {/*       readOnly={false}*/}
                            {/*       style={{"border": "0px"}}*/}
                            {/*/>*/}


                        </Descriptions.Item>
                    </Descriptions>

                    <Descriptions title="Package Information" bordered="true" className="confirmInfor">
                        <Descriptions.Item label="Size">
                            {this.state.size}
                        </Descriptions.Item>
                        <Descriptions.Item label="Weight">
                            {this.state.weight}
                        </Descriptions.Item>
                        <Descriptions.Item label='Emergency'>
                            {this.state.emergency}
                        </Descriptions.Item>
                    </Descriptions>

                    <Descriptions title="Delivery" bordered="true" className="confirmInfor">
                        <Descriptions.Item label="Method">
                            {this.state.method}
                        </Descriptions.Item>
                        <Descriptions.Item label="Distance">
                            {this.state.distance}
                        </Descriptions.Item>
                        <Descriptions.Item label="Estimated Time">
                            {this.state.time}
                        </Descriptions.Item>
                        <Descriptions.Item label="cost">
                            {this.state.cost}
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                <div className="buttonLayout">
                    <Button type="default" onClick={this.goBack}>
                        Prev
                    </Button>
                    <Button type="primary" onClick={this.goNext}>
                        Next
                    </Button>
                </div>

            </div>


        );
    }
}

export default Confirm;