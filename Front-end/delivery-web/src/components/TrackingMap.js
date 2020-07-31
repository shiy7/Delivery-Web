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
import {message} from "antd"


class NormalMap extends Component {
    state = {
        directions: null,
        sender:false,
        origin: this.props.information.deliverRobotLocation,
        destination:this.props.information.receiverAddress,
        halfWay:this.props.information.deliverAddress,
        status: this.props.information.shipmentStatus,
        method: this.props.information.deliverMethod,
        isOpen:false,
        mapData: false,
        geolocation:''
    }

    componentDidMount() {
        this.fetchData();

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
                console.log(data.robotLat);
                this.setState({geoLocation:data, mapData:true});
            })
            .catch((err) => {
                console.error(err);
                message.error('GeoLocation failed.');
            });
    }

    // to control if to show infoWindow or not
    handleToggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        // console.log("==> ",this.state.geoLocation.senderLat)
        return (
            <div>
                {
                    this.state.mapData ?
                        <GoogleMap
                            defaultZoom={15}
                            defaultCenter={{lat: 37.77493, lng: -122.419415}}

                        >
                            {this.state.directions &&
                            <DirectionsRenderer directions={this.state.directions}
                                                options={{suppressMarkers: true}}
                            />}
                            <Marker
                                name={'Robot Position'}
                                position={{lat: this.state.geoLocation.robotLat, lng: this.state.geoLocation.robotLng}}
                                icon={{
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
                                position={{lat: this.state.geoLocation.senderLat, lng: this.state.geoLocation.senderLng}}
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
                        </GoogleMap> : null
                }
            </div>

        );
    }
}

const TrackingMap = withScriptjs(withGoogleMap(NormalMap));

export default TrackingMap;