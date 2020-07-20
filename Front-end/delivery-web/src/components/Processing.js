import React, {Component} from 'react';
import Shipping from "./Shipping"

import { Steps, Button, message } from 'antd';
import Recommend from "./Recommend"
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Confirm from "./Confirm"
import Payment from "./Payment"
import OrderDetail from "./OrderDetail"

const { Step } = Steps;

const steps = [
    {
        title: 'Step 1',
        content: <Link to='/processing/shipping'/>,
        description: "Please finish shipping information"
    },
    {
        title: 'Step 2',
        content:  <Link to='/processing/recommend'/>,
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

class Processing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        }
    }

    next(){
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;

        return (
            <div>
                <Steps current={current} className="steps-bar">
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description} />
                    ))}
                </Steps>
                <div className="steps-content">
                    {steps[current].content}
                    <Switch>
                        <Route path='/processing/shipping' component={Shipping}/>
                        <Route path='/processing/recommend' component={Recommend}/>
                        <Route path='/processing/confirm' component={Confirm}/>
                        <Route path='/processing/pay' component={Payment}/>
                        <Route path='/processing/details' component={OrderDetail}/>
                    </Switch>
                </div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
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

export default withRouter(Processing);