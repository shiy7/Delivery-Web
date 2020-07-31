import React, {Component} from 'react';
import {Input, Row, Col, Descriptions, message} from 'antd';
import TrackingMap from "./TrackingMap";
import DroneMap from "./DroneMap";
import OrderDetail from "./OrderDetail"

const {Search} = Input;

class Tracking extends Component {
    state = {
        information: '',
        loadMap:'',
        robot: true
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
                    this.setState({information: data}, () => {
                        if (this.state.information.shipmentStatus === 'pick up' || this.state.information.shipmentStatus === 'delivering'){
                            this.setState({loadMap:true})
                        } else {
                            this.setState({loadMap:false})
                        }
                        if (this.state.information.deliverMethod === 'drone'){
                            this.setState({robot: false})
                        }
                    });

                }
            )
            .catch((err) => {
                console.error(err);
                message.error('No existing package, please enter a valid tracking number!');
                this.props.history.push(`/home`);
            });

    }


    render() {
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
                    <OrderDetail info={this.state.information}/>
                </div>
                <div className="trackMap">
                    {this.state.loadMap ?
                        this.state.robot ?
                            <TrackingMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px`, width:'60%', textAlign:"center",margin:"auto"}} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                information={this.state.information}

                            /> :
                            <DroneMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `600px`, width:'60%', textAlign:"center",margin:"auto"}} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                information={this.state.information}
                            />
                         : null
                    }

                </div>
            </div>
        );
    }
}

export default Tracking;