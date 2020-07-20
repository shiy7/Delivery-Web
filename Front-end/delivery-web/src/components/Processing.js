import React, {Component} from 'react';
import Shipping from "./Shipping"

import { Steps, Button, message } from 'antd';
import Recommend from "./Recommend"
import {Route, Switch} from "react-router-dom"
const { Step } = Steps;

const steps = [
    {
        title: 'Step 1',
        content: <Shipping />,
        description: "Please finish shipping information"
    },
    {
        title: 'Step 2',
        content: <Recommend />,
        description: 'Please choose one shipping method'
    },
    {
        title: 'Step 3',
        content: 'third-content',
        description: 'Please confirm your order information'
    },
    {
        title: 'Step 4',
        content: 'Fourth-content',
        description: 'Please finish payment'
    },
    {
        title: 'Done',
        content: 'Last-content',
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
                <div className="steps-content">{steps[current].content}</div>
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

export default Processing;