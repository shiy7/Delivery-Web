import React, {Component} from 'react';
import {Button, Input} from 'antd';

const {Search} = Input;

class Tracking extends Component {
    render() {
        return (
            <div>
                <div className="input">
                    <Search
                        placeholder="input search text"
                        enterButton="Tracking"
                        size="large"
                        style={{width: 800}}
                        onSearch={value => console.log(value)}
                    />
                </div>
                <div className="detail">
                    
                </div>
            </div>
        );
    }
}

export default Tracking;