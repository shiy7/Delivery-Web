import React, {Component} from 'react';
import {Input, Row, Col, Descriptions} from 'antd';
import TrackingMap from "./TrackingMap";
import OrderDetail from "./OrderDetail"

const {Search} = Input;

class Tracking extends Component {
    state = {
        information: ''
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        if (this.state.information.orderNumber !== this.props.match.params.id) {
            this.fetchData();
        }

    }


    toTracking(value) {

        this.props.history.push(`/tracking/`.concat(value));
        // this.componentDidMount();
    }

    fetchData() {
        const tracking = this.props.match.params.id;
        const url = '/order/'.concat(tracking)
        // trackingnumber.package_info.tracking_number = tracking;

        console.log(url);
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
                    this.setState({information: data});

                }
            );
    }


    render() {
        // this.fetchData();
        // console.log(trackingnumber.package_info);
        console.log(this.state)
        return (
            <div>
                <div className="input">
                    <Search

                        placeholder={this.props.match.params.id}
                        enterButton="Tracking"
                        size="large"
                        style={{width: 800}}
                        onSearch={value => this.toTracking(value)}
                    />
                </div>
                <div className="detail">
                    {/*<Row>*/}
                    <OrderDetail info={this.state.information}/>
                    {/*<Col span={8}>*/}
                    {/*    <OrderDetail info = {this.state.trackingNumber}/>*/}
                    {/*</Col>*/}
                    {/*<Col span={16}>*/}
                    {/*<TrackingMap*/}
                    {/*    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&v=3.exp&libraries=geometry,drawing,places"*/}
                    {/*    loadingElement={<div style={{ height: `100%` }} />}*/}
                    {/*    containerElement={<div style={{ height: `600px` }} />}*/}
                    {/*    mapElement={<div style={{ height: `100%` }} />}*/}
                    {/*/>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                </div>
            </div>
        );
    }
}

export default Tracking;