import React, {Component} from 'react';
import { Card, Col, Row ,Radio } from 'antd';
import {API_ROOT} from "../constants"
import {globaldata} from './Processing'
import {Button, Form} from "antd";
class RecommendForm extends Component {
    //  goNext = (e) => {
    //     e.preventDefault();
    //     validateFields((err, values) => {
    //         if(!err) {
    //             props.submittedValues(values);
    //             props.handleNextButton();
    //         }
    //     });
    // }
    goNext = () => {
        this.props.handleNextButton();
    }

    goBack = () =>{
     // props.submittedValues(values);
        this.props.handlePrevButton();


    }


    // state = {
    //     username : null,
    //     userAddress: null,
    //     receiverAddress: null
    // }



    // componentDidUpdate(prevProps) {
    //     if(prevProps.address !== this.props.address) {
    //         this.setState({useraddress: this.props.address});
    //     }
    // }
    // static getDerivedStateFromProps(props, state) {
    //     // Any time the current user changes,
    //     // Reset any parts of state that are tied to that user.
    //     // In this simple example, that's just the email.
    //     if (props.address !== state.useraddress) {
    //         return {
    //             useraddress: props.address
    //         };
    //     }
    //     return null;
    // }
    // componentWillReceiveProps(nextProps) {
    //     if(this.props.address !== nextProps.address){
    //         console.log("doesn't match")
    //     }else{
    //         console.log("match")
    //     }
    //     this.setState({
    //         useraddress: nextProps.address,
    //
    //     })
    //
    //
    //
    // }

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
        console.log(globaldata._currentValue.useraddress);
        // console.log(this.state.useraddress)
        // const address = localStorage.getItem("useraddress");
        // console.log(localStorage.getItem("useraddress"));
        // localStorage.removeItem("useraddress");
        let field = this.context;
        console.log(field);
        return (
            <div>
                {/*<div style ={{float: "left", width: 50}}>*/}
                {/*<button onClick= {()=>this.forceUpdate()} >FORCE UPDATE</button>*/}
                {/*<p>{globaldata._currentValue.useraddress}</p>*/}

<div>
                <Radio.Group>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Route 1: shipping by robot" bordered={true}>
                                Card content
                            </Card>
                            <Radio >A</Radio>

                        </Col>
                        <Col span={12}>
                            <Card title="Route 2: shipping by Drone" bordered={true}>
                                Card content
                            </Card>
                            <Radio >B</Radio>
                        </Col>

                    </Row>


                </Radio.Group>
</div>
                {/*<span style= {{float:"left", width: 50}}>*/}
                {/*<Card title="Route 1: shipping by robot" extra={<a href="#">More</a>} style={{ width: 300 }}>*/}
                {/*  <p>Card content</p>*/}
                {/*  <p>Card content</p>*/}
                {/*  <p>Card content</p>*/}
                {/*</Card>*/}
                {/*<Card title="Route 2: shipping by robot " extra={<a href="#">More</a>} style={{ width: 300 }}>*/}
                {/*  <p>Card content</p>*/}
                {/*  <p>Card content</p>*/}
                {/*  <p>Card content</p>*/}
                {/*</Card>*/}
                {/*</span>*/}


                {/*</span>*/}
                {/*</div>*/}
                    {/*<p>user address is {localStorage.getItem('userAddress')}</p>*/}
                {/*<p>r address is {localStorage.getItem('raddress')}</p>*/}
                {/*<button onClick={this.clear}>*/}

                {/*</button>*/}
                <div className="buttonLayout" >
                <Button type="default" onClick={this.goBack}>
                    Prev
                </Button>
                <Button type="primary" onClick={this.goNext}>
                    Next
                </Button>
                </div>

            </div>
        );
    }
}
const Recommend = Form.create({ name: 'Recommend' })(RecommendForm)
export default Recommend;
