import React, {Component} from 'react';
import { Input, Row, Col,Descriptions } from 'antd';
import TrackingMap from "./TrackingMap";
import OrderDetail from "./OrderDetail"

const {Search} = Input;

class Tracking extends Component {
    state = {
        information:''
    }
    storeData (data){
        trackingnumber.package_info.deliver_address = data.deliverAddress;
        trackingnumber.package_info.package_weight = data.packageWeight;
        // trackingnumber.package_info.payment = data.payment;
        trackingnumber.package_info.receiver_name = data.receiverName;
    }

    componentDidMount() {
        // this.setState("trackingNumber",this.props.match.params.id);
        const tracking = this.props.match.params.id;
        const url = '/order/'.concat(tracking)
        trackingnumber.package_info.tracking_number = tracking;

        console.log(url);
                    fetch( url, {
                        method: 'GET',
                        headers: {
                            'Access-Control-Allow-Origin': 'http://localhost:3000',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data=>{console.log(data);
                            this.storeData(data);
                        console.log(trackingnumber.package_info.deliver_address)}
                        );
                    // console.log(this.state.information);
                        // .then(trackingnumber.package_info.deliver_address = data.deliverAddress);

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
                        onSearch={value => console.log(value)}
                    />
                </div>
                <div className="detail">
                    <Row>
                        <OrderDetail info = {this.state.information}/>
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
                    </Row>
                </div>
            </div>
        );
    }
}

export default Tracking;
export const trackingnumber ={
    package_info: {
        tracking_number:'',
        deliver_address:'',
        package_weight:'',
        payment:'',
        receiver_name:''
}
};
export const trackingdata = React.createContext(trackingnumber.package_info);