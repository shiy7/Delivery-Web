import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'

class Payment extends Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    }

    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;

        this.setState({[name]: value});
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
                               type="text"
                               name="expiry"
                               placeholder="MM/YY Expiry"
                               onChange={this.handleInputChange}
                               onFocus={this.handleInputFocus}
                        />
                        <input className="cardCVC"
                               type="tel"
                               name="CVC"
                               placeholder="CVC"
                               onChange={this.handleInputChange}
                               onFocus={this.handleInputFocus}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Payment;