import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
    Marker,
    InfoWindow
} from "react-google-maps";
import Sender from '../assets/images/sender.png';
import Receiver from '../assets/images/receiver.png'
import Drone from "../assets/images/droneMap.png"

class NormalDroneMap extends Component {
    state = {
        directions: null,
        sender: false,
        origin: {lat: 37.758271, lng: -122.428361},
        destination: {lat: 37.758563, lng: -122.418692},
        halfWay: {lat: 37.757979, lng: -122.427949},
        status: this.props.information.shipmentStatus,
        method: this.props.information.deliverMethod,
        path: [],
        isOpen: false
    }

    componentDidMount() {
        if (this.state.status === 'pick up') {
            this.setState(prev => ({path: [prev.origin, prev.halfWay, prev.destination], sender:true}));
        } else {
            this.setState(prev => ({path: [prev.origin, prev.destination]}));
        }

    }

    handleToggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={this.state.origin}

            >
                <Polyline path={this.state.path}
                          geodesic={true}
                          options={{
                              strokeColor: "#ff2527",
                              strokeOpacity: 0.75,
                              strokeWeight: 3,
                          }}
                />
                <Marker
                    name={'Robot Position'}
                    position={{lat: 37.758271, lng: -122.428361}}
                    icon={{
                        url: Drone,
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
                    position={{lat: 37.757979, lng: -122.427949}}
                    icon={{
                        url: Sender,
                        scaledSize: new window.google.maps.Size(39, 60),
                    }}
                /> : null}

                <Marker
                    name={'Receiver'}
                    position={{lat: 37.758563, lng: -122.418692}}
                    icon={{
                        url: Receiver,
                        scaledSize: new window.google.maps.Size(39, 60),
                    }}
                />
            </GoogleMap>

        );
    }
}

const DroneMap = withScriptjs(withGoogleMap(NormalDroneMap));

export default DroneMap;