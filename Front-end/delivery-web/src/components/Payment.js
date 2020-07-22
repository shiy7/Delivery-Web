
import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import {Button} from "antd"

class Payment extends Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = this.formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = this.formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = this.formatCVC(target.value);
        }
        this.setState({ [target.name]: target.value });
    };

    clearNumber (value = ""){
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

    handleSubmit = (e) => {
        e.preventDefault();
        const {number} = this.state;
        const lastDigit = new Array(13).join('*') + number.slice(number.length-4);
        const tmp =`${lastDigit.slice(0, 4)} ${lastDigit.slice(4, 8
        )} ${lastDigit.slice(8, 12)} ${lastDigit.slice(12, 19)}`;
        localStorage.setItem("Card number", tmp);
        // this.props.handleNextButton();
    }

    render() {
        return (
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
                    <Button type="primary" > Prev </Button>
                    <Button type = "primary" onClick={this.handleSubmit}> Pay </Button>
                </div>

            </div>
        );
    }
}

