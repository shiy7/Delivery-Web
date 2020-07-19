import React, {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

class NormalMap extends Component {
    render() {

        return (
            <div>

            </div>
        );
    }
}

const TrackingMap = withScriptjs(withGoogleMap(NormalMap));

export default TrackingMap;