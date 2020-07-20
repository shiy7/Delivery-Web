import React, {Component} from 'react';
import {API_ROOT} from "../constants"

class Recommend extends Component {
    state = {
        response: null
    }


    getResponse = ( ) => {
        const url = '/api/hello';
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then(response => console.log(response))
            .then(data => console.log('data ->',data));
    }



    render() {

        return (
            <div>
                <button onClick={this.getResponse}>
                    test
                </button>
            </div>
        );
    }
}

export default Recommend;