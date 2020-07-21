import React, {Component} from 'react';
import {API_ROOT} from "../constants"

class Recommend extends Component {
    state = {
        userAddress: null,
        receiverAddress: null
    }
    // componentDidMount() {
    //
    //             const url = '/recommend'
    //             fetch( url, {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //
    //                             useraddress: localStorage.getItem('userAddress'),
    //                             raddress: localStorage.getItem('raddress'),
    //                 }),
    //                 headers: {
    //                     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //                 .then(response => response.json())
    //                 .then(data => console.log('data ->',data));
    //
    // }

    getResponse = ( ) => {
        // const url = 'https://cors-anywhere.herokuapp.com/https://stackoverflow.com/questions/53998407/getting-undefined-when-trying-to-fetch-data-from-an-api-react';
        // const url = 'http://localhost:8080/recommend';
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = '/recommend'

        fetch( url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
            .then(response => response.json())
            .then(data => console.log('data ->',data));
    }

    clear= () =>{
        localStorage.clear();
    }




    render() {

        return (
            <div>
                <p>user address is {localStorage.getItem('userAddress')}</p>
                <p>r address is {localStorage.getItem('raddress')}</p>
                <button onClick={this.clear}>

                </button>
            </div>
        );
    }
}

export default Recommend;