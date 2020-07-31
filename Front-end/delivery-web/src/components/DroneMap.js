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
import {message} from "antd"

class NormalDroneMap extends Component {
    state = {
        directions: null,
        sender: false,
        origin: this.props.information.deliverRobotLocation,
        destination:this.props.information.receiverAddress,
        halfWay:this.props.information.deliverAddress,
        status: this.props.information.shipmentStatus,
        method: this.props.information.deliverMethod,
        path: [],
        isOpen: false,
        mapData: false,
        geoLocation:''
    }

    componentDidMount() {
        this.fetchData()

    }

    fetchData = () => {
        const url = '/geo'
        fetch(url,{
            method: `POST`,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderAddress:this.state.halfWay,
                receiverAddress: this.state.destination,
                robotAddress: this.state.origin
            }),
        })
            .then(response => {
                // console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((data) => {
                console.log('data', data)
                this.setState({geoLocation:data}, () => {
                    console.log(this.state.geoLocation);
                    if (this.state.status === 'pick up') {
                        this.setState({path: [
                                {lat: this.state.geoLocation.robotLat, lng: this.state.geoLocation.robotLng},
                                {lat: this.state.geoLocation.senderLat, lng: this.state.geoLocation.senderLng},
                                {lat: this.state.geoLocation.receiverLat, lng: this.state.geoLocation.receiverLng}
                            ],
                            sender:true,
                            mapData:true
                        });
                    } else {
                        this.setState( {path: [
                                {lat: this.state.geoLocation.robotLat, lng: this.state.geoLocation.robotLng},
                                {lat: this.state.geoLocation.receiverLat, lng: this.state.geoLocation.receiverLng}
                            ],
                            mapData:true
                        })
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                message.error('GeoLocation failed.');
            });
    }

    handleToggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        console.log("=>",this.state.path)
        return (
            <div>
                {this.state.mapData ?
                    <GoogleMap
                        defaultZoom={15}
                        defaultCenter={{lat: this.state.geoLocation.robotLat, lng: this.state.geoLocation.robotLng}}

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
                            position={{
                                lat: this.state.geoLocation.robotLat,
                                lng: this.state.geoLocation.robotLng
                            }}
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
                            position={{
                                lat: this.state.geoLocation.senderLat,
                                lng: this.state.geoLocation.senderLng
                            }}
                            icon={{
                                url: Sender,
                                scaledSize: new window.google.maps.Size(39, 60),
                            }}
                        /> : null}

                        <Marker
                            name={'Receiver'}
                            position={{
                                lat: this.state.geoLocation.receiverLat,
                                lng: this.state.geoLocation.receiverLng
                            }}
                            icon={{
                                url: Receiver,
                                scaledSize: new window.google.maps.Size(39, 60),
                            }}
                        />
                    </GoogleMap> : null}
            </div>
        );
    }
}

const DroneMap = withScriptjs(withGoogleMap(NormalDroneMap));

export default DroneMap;