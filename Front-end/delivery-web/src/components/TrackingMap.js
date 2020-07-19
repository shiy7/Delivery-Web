import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";

class NormalMap extends Component {
    state = {
        directions: null
    }

    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();

        const origin = {lat: 41.8507300, lng:-87.6512600};
        const destination = {lat: 41.8525800, lng:-87.6524100};
        const waypts = [{
            location: {lat:41.8525800,lng:-87.6514000},
            stopover: true
        }];

        DirectionsService.route({
            origin: origin,
            destination: destination,
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

    render() {
        return (
            <GoogleMap
                defaultZoom={7}
                defaultCenter={{lat:41.8507300, lng: -87.6512600}}
            >
                {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
            </GoogleMap>
        );
    }
}

const TrackingMap = withScriptjs(withGoogleMap(NormalMap));

export default TrackingMap;