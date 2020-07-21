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
        current : 0,
        step: 1,
        step_one_fields: {
            username: '',
            userphone: ''
        },
        step_two_fields: {
            f_one_s_two: '',
            f_two_s_two: ''
        },
        step_final_fields: {
            f_one_s_final: '',
            f_two_s_final: ''
        },

    }
    next =()=>{

        const current = this.state.current + 1;

        this.setState({ current });
    }

    getStepOneValue = (values) => {
        const { step_one_fields } = this.state;
        console.log(values);
        this.setState({step_one_fields: {
                ...step_one_fields,
                ...values
            }})
    };
    steps = [
        {
            title: 'Step 1',
            content: <Shipping handleNextButton={this.next} submittedValues={this.getStepOneValue}/>,
            // content:<Shipping/>,
            description: "Please finish shipping information"
        },
        {
            title: 'Step 2',
            content:  <Recommend/>,
            description: 'Please choose one shipping method'
        },
        {
            title: 'Step 3',
            content: <Redirect to='/processing/confirm'/>,
            description: 'Please confirm your order information'
        },
        {
            title: 'Step 4',
            content: <Redirect to='/processing/pay'/>,
            description: 'Please finish payment'
        },
        {
            title: 'Done',
            content: <Redirect to='/processing/details'/>,
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
                    {/*<Switch>*/}
                    {/*    <Route path='/processing/shipping' component={Shipping}/>*/}
                    {/*    <Route path='/processing/recommend' component={Recommend}/>*/}
                    {/*    <Route path='/processing/confirm' component={Confirm}/>*/}
                    {/*    <Route path='/processing/pay' component={Payment}/>*/}
                    {/*    <Route path='/processing/details' component={OrderDetail}/>*/}
                    {/*</Switch>*/}
                </div>
                <div className="steps-action">
                    {current < this.steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === this.steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default Processing;