
import React, {Component} from 'react';
import Shipping from "./Shipping"

import { Steps, Button, message } from 'antd';
import Recommend from "./Recommend"
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Confirm from "./Confirm"
import Payment from "./Payment"
import OrderDetail from "./OrderDetail"

const { Step } = Steps;




class Processing extends Component {

    state = {
        current: 0,
        step: 1,
        infor: [],
        step_two_fields: null,
        step_final_fields: {
            f_one_s_final: '',
            f_two_s_final: ''
        }
    }

    next =()=>{
        const current = this.state.current + 1;
        this.setState({ current });
    }


    getStepOneValue = (values) => {
        console.log(values);
        this.setState( {
            infor: values
        })
    };


    steps = [
        {
            title: 'Step 1',
            content: <Shipping
                infor = {this.state.infor}
                submittedValues={this.getStepOneValue}
                // handleNextButton={this.next}
            />,
            // content:<Shipping/>,
            description: "Please finish shipping information"
        },
        {
            title: 'Step 2',
            content:  <Recommend infor={this.state.infor}/>,
            description: 'Please choose one shipping method'
        },
        {
            title: 'Step 3',
            content: <Confirm />,
            description: 'Please confirm your order information'
        },
        {
            title: 'Step 4',
            content: <Payment />,
            description: 'Please finish payment'
        },
        {
            title: 'Done',
            content: <OrderDetail />,
            description: 'Order details'
        }
    ];


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         current: 0,
    //         username: ''
    //     }
    // }



    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current} = this.state;
        return (
            <div>
                <Steps current={current} className="steps-bar">
                    {this.steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description} />

                    ))}
                </Steps>
                <div className="steps-content">
                    {this.steps[current].content}
                </div>
                {/*<div className="steps-action">*/}
                {/*    {current == 0 && (*/}
                {/*        <Button type="primary" onClick={() => this.next()}>*/}
                {/*            Next*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*    {current === this.steps.length - 1 && (*/}
                {/*        <Button type="primary" onClick={() => message.success('Processing complete!')}>*/}
                {/*            Done*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*    {current > 0 && (*/}
                {/*        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>*/}
                {/*            Previous*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Processing;