import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker,
    InfoWindow
} from "react-google-maps";
import Robot from '../assets/images/robotMap.png';
import Sender from '../assets/images/sender.png';
import Receiver from '../assets/images/receiver.png'


class NormalMap extends Component {
    state = {
        directions: null,
        sender:false,
        origin: this.props.information.deliverRobotLocation,
        destination:this.props.information.receiverAddress,
        halfWay:this.props.information.deliverAddress,
        status: this.props.information.shipmentStatus,
        method: this.props.information.deliverMethod,
        geoPosition:[],
        isOpen:false,
    }

    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();
        const waypts = []

        if (this.state.status === 'pick up'){
            waypts.push({
                location: this.state.halfWay,
                stopover: true
            });
            this.setState({sender: true});
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


    // codeAddress = (address) => {
    //     const geocoder = new window.google.maps.Geocoder();
    //     geocoder.geocode({
    //         address: address
    //     }, (results, status) =>{
    //         if (status === "OK") {
    //             this.setState({geoPosition:results[0].geometry.location })
    //         } else {
    //             alert('Geocode was not successful for the following reason: ' + status);
    //         }
    //     });
    // }

    // to control if to show infoWindow or not
    handleToggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        // const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD0HMPqMB0O_aqrBGCKhSQ99fKeDrbRtN8&address='
        // const geoOrigin =

        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat:37.77493, lng: -122.419415}}

            >
                {this.state.directions &&
                <DirectionsRenderer directions={this.state.directions}
                                    options={{suppressMarkers: true}}
                />}
                <Marker
                    name={'Robot Position'}
                    position={{lat:37.758271,lng:-122.428361}}
                    icon = {{
                        url: Robot,
                        scaledSize: new window.google.maps.Size(39, 60),
                    }}
                    onClick={this.handleToggle}
                >
                    {this.state.isOpen ? (
                        <InfoWindow>
                            <div>
                                {this.state.origin}
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>

                {this.state.sender ? <Marker
                    name={'Sender'}
                    position={{lat:37.757979,lng:-122.427949}}
                    icon = {{
                        url: Sender,
                        scaledSize: new window.google.maps.Size(39, 60),
                    }}
                /> : null}

                <Marker
                    name={'Receiver'}
                    position={{lat:37.758563,lng:-122.418692}}
                    icon = {{
                        url: Receiver,
                        scaledSize: new window.google.maps.Size(39, 60),
                    }}
                />
            </GoogleMap>
        );
    }
}

const TrackingMap = withScriptjs(withGoogleMap(NormalMap));

export default TrackingMap;