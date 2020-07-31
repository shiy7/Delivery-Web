import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker
} from "react-google-maps";
import Robot from '../assets/images/robot.png';
import Drone from '../assets/images/drone.png';

class NormalMap extends Component {
    state = {
        directions: null,
        origin: this.props.information.deliverRobotLocation,
        destination:this.props.information.receiverAddress,
        halfWay:this.props.information.deliverAddress,
        status: this.props.information.shipmentStatus,
        method: this.props.information.deliverMethod,
        geoPosition:[]
    }

    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();
        const waypts = []

        if (this.state.status === 'pick up'){
            waypts.push({
                location: this.state.halfWay,
                stopover: true
            });
        }


        DirectionsService.route({
            origin: this.state.origin,
            destination: this.state.destination,
            waypoints:waypts,
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }


    codeAddress = (address) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({
            address: address
        }, (results, status) =>{
            if (status === "OK") {
                this.setState({geoPosition:results[0].geometry.location })
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    render() {
        // const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&address='
        // const geoOrigin =

        return (
            <GoogleMap
                defaultZoom={7}
                defaultCenter={{lat:37.77493, lng: -122.419415}}
            >
                {this.state.directions && <DirectionsRenderer directions={this.state.directions} markerArray={null}/>}
                {/*<Marker*/}
                {/*    name={'Robot Position'}*/}
                {/*    position={{lat:37.758271,lng:-122.428361}}*/}
                {/*    icon = {{*/}
                {/*        url: Robot,*/}
                {/*        anchor: new window.google.maps.Point(15,15),*/}
                {/*        scaledSize: new window.google.maps.Size(26, 41),*/}
                {/*    }}*/}
                {/*/>*/}
                {/*{this.codeAddress(this.state.origin)}*/}
                {/*<Marker*/}
                {/*    name={'Sender'}*/}
                {/*    position={{lat:37.757979,lng:-122.427949}}*/}
                {/*    icon = {{*/}
                {/*        url: Robot,*/}
                {/*        scaledSize: new window.google.maps.Size(26, 41),*/}
                {/*    }}*/}
                {/*/>*/}
                {/*{this.codeAddress(this.state.destination)}*/}
                {/*<Marker*/}
                {/*    name={'Receiver'}*/}
                {/*    position={{lat:37.758563,lng:-122418692}}*/}
                {/*    icon = {{*/}
                {/*        url: Robot,*/}
                {/*        anchor: new window.google.maps.Point(15,15),*/}
                {/*        scaledSize: new window.google.maps.Size(26, 41),*/}
                {/*    }}*/}
                {/*/>*/}
            </GoogleMap>
        );
    }
}

const TrackingMap = withScriptjs(withGoogleMap(NormalMap));

export default TrackingMap;