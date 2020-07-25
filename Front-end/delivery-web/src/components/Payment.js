import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import {Button, message} from "antd"

class Payment extends Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    }

    handleInputChange = ({target}) => {
        if (target.name === "number") {
            target.value = this.formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = this.formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = this.formatCVC(target.value);
        }
        this.setState({[target.name]: target.value});
    };

    clearNumber(value = "") {
        return value.replace(/\D+/g, "");
    }

    formatCreditCardNumber(value) {
        if (!value) {
            return value;
        }

        const clearValue = this.clearNumber(value);
        let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8
        )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;

        return nextValue.trim();
    }

    formatCVC(value, prevValue, allValues = {}) {
        const clearValue = this.clearNumber(value);
        let maxLength = 4;

        return clearValue.slice(0, maxLength);
    }

    formatExpirationDate(value) {
        const clearValue = this.clearNumber(value);

        if (clearValue.length >= 3) {
            return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
        }

        return clearValue;
    }

    goNext = (e) => {
        e.preventDefault();
        const {number} = this.state;
        const lastDigit = new Array(13).join('*') + number.slice(number.length - 4);
        const tmp = `${lastDigit.slice(0, 4)} ${lastDigit.slice(4, 8
        )} ${lastDigit.slice(8, 12)} ${lastDigit.slice(12, 19)}`;
        localStorage.setItem("card", tmp);
        this.postData();
        this.clear();
        this.props.handleNextButton();
    }

    // show(){
    //
    //         console.log(localStorage.getItem("user_phone"));
    //     console.log(localStorage.getItem("user_address"));
    //     console.log(localStorage.getItem("r_name"));
    //     console.log(localStorage.getItem("r_phone"));
    //         console.log(localStorage.getItem("r_address"));
    //             console.log(localStorage.getItem("size"));
    //                 console.log(localStorage.getItem("emergency"));
    //                     console.log(localStorage.getItem("weight"));
    //                         console.log(localStorage.getItem("method"));
    //                             console.log(localStorage.getItem("time"));
    //                                 console.log(localStorage.getItem("cost"));
    //                                     console.log(localStorage.getItem("distance"));
    //                                         console.log(localStorage.getItem("card"));
    // }
    generateTrackingNumber(number) {
        let i;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
        const charactersLength = characters.length;
        for (i = 0; i < 4; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        for (i = 0; i < number; i++ ) {

            result += digits.charAt(Math.floor(Math.random() * 10));
        }
        return result;
    }

    postData = () => {
        // const encoded = window.btoa('rex: pass123');
        // const auth = 'Basic ' + encoded;
        const trackingNum = this.generateTrackingNumber(12);
        fetch(`/order?username=tim`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // username: localStorage.getItem("user_name"),
                orderNumber:trackingNum,
                senderPhone: localStorage.getItem("user_phone"),
                deliverAddress: localStorage.getItem("user_address"),
                receiverName: localStorage.getItem("r_name"),
                receiverPhone: localStorage.getItem("r_phone"),
                receiverAddress: localStorage.getItem("r_address"),
                packageSize: localStorage.getItem("size"),
                emergency: localStorage.getItem("emergency"),
                packageWeight: localStorage.getItem("weight"),
                deliverMethod: localStorage.getItem("method"),
                estimateTime: localStorage.getItem("time"),
                money: localStorage.getItem("cost"),
                estimateDistance: localStorage.getItem("distance"),
                cardNo: localStorage.getItem("card")
            }),
        })
            .then(response => {
                // console.log(response);
                if (response.ok) {
                    return response.text();
                }
                throw new Error(response.statusText);
            })
            .then((data) => {
                console.log(data);
                message.success('Registration succeed!');
                // back to login page
                console.log(this.props);
                // this.props.history.push('/login');


            })
            .catch((err) => {
                console.error(err);
                message.error('Registration failed.');
            });
    }

    goBack = () => {
        this.props.handlePrevButton();

    }

    clear = () => {
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <div>
                    <p style={{"fontSize": "24px", "marginTop": "40px"}}> Your total balance is
                        ${localStorage.getItem("cost")}</p>
                </div>

                <div id="PaymentForm" className="pay">
                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                    <form>
                        <div>
                            <input className="cardNumber"
                                   type="tel"
                                   name="number"
                                   placeholder="Card Number"
                                   onChange={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                            />

                        </div>
                        <div>
                            <input className="cardName"
                                   type="text"
                                   name="name"
                                   placeholder="Name"
                                   onChange={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div>
                            <input className="expiry"
                                   type="tel"
                                   name="expiry"
                                   placeholder="MM/YY Expiry"
                                   onChange={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                            />
                            <input className="cardCVC"
                                   type="tel"
                                   name="cvc"
                                   placeholder="CVC"
                                   onChange={this.handleInputChange}
                                   onFocus={this.handleInputFocus}
                            />
                        </div>
                    </form>
                    <div className="buttonPay">
                        <Button type="default" onClick={this.goBack}> Prev </Button>
                        <Button type="primary" onClick={this.goNext}> Pay </Button>
                    </div>

                </div>
            </div>

        );
    }
}

export default Payment;

