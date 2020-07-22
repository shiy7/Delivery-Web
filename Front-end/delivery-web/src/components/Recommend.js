import React, {Component} from 'react';
import {API_ROOT} from "../constants"
import { Descriptions, Badge, Col, Row } from 'antd';

class Recommend extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {infor: props.infor};
    // }


    // componentDidMount() {
    //
    //             const url = '/recommend'
    //             fetch( url, {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //
    //                             useraddress: this.props,
    //                             raddress: this.props,
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
            .then(data => {
                console.log('data ->',data);
            });
    }

    clear= () =>{
        localStorage.clear();
    }


    render() {
        console.log(this.props.infor)
        return (
            <div>
                {/*<p>user address is {localStorage.getItem('userAddress')}</p>*/}
                {/*<p>r address is {localStorage.getItem('raddress')}</p>*/}
                {/*<button onClick={this.clear}>*/}

                {/*</button>*/}

                <Row gutter={8}>
                    <Col span={12}>
                        <p>user address is {localStorage.getItem('userAddress')}</p>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <p>user address is {localStorage.getItem('rAddress')}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Recommend;