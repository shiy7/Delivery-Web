import React, {Component} from 'react';
import {Button, Input, Row, Col} from 'antd';
import TrackingMap from "./TrackingMap";
import OrderDetail from "./OrderDetail"

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
                    <Row>
                        <Col span={8}>
                            <OrderDetail />
                        </Col>
                        <Col span={16}>
                            <TrackingMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px`, width:'1000px' }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Tracking;