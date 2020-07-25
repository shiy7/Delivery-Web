import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register  from './Register';
import Login from "./Login"
import Home from './Home';
import Shipping from './Shipping';
import DashBoard from "./DashBoard";
import Tracking from "./Tracking";
import '../styles/Main.css';
import Recommend from "./Recommend"
import Processing from "./Processing"
import Profile from "./Profile"
import Payment from "./Payment";
import Confirm from "./Confirm"

class Main extends React.Component {
    state = {

    }
    getLogin = () => {
        // case 1: already login --> <Home></Home>
        // case 2: not yet --> <log />
        // return this.props.isLoggedIn ?
        return localStorage.getItem("userID") !== null ?
            <Redirect to="/dashboard"/>
            // : <Login />
            : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }


    getHome = () => {
        // case 1: already login --> <Home />
        // case 2: not yet --> <log />
        // return this.props.isLoggedIn ?
        //     <Home/> : <Redirect to="/login"/>;
        return <Home/>;
    }

    getShipping = () => {
        return this.props.isLoggedIn ?
            <Shipping handleLoginSucceed={this.props.handleLoginSucceed}/> : <Redirect to="/login"/>;
    }

    getDashBoard = () => {
        return this.props.isLoggedIn ?
            <DashBoard />: <Redirect to="/login"/>;
    }





    render() {
        console.log(this.props.isLoggedIn);
        return (
            <div className="main">
                <div className="search">
                    <Switch>
                        {/*
                    Route: The Route component is perhaps the most important component in React Router
                     to understand and learn to use well. Its most basic responsibility is to render some UI
                     when a location matches the route’s path.

                     Switch: Renders the first child <Route> or <Redirect> that matches the location.

                     render: 动态
                     component：静态
                     */}
                        {/*<Route path="/login" render={this.getLogin}/>*/}
                        <Route path="/login" render={this.getLogin}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/shipping" component={Shipping}/>
                        <Route path="/dashboard" component={DashBoard}/>
                        <Route path="/tracking/:id" component={Tracking} />
                        <Route path="/recommend" component={Recommend}/>
                        <Route path="/processing" component={Processing}/>
                        <Route path="/pay" component={Payment}/>
                        <Route path='/confirm' component={Confirm}/>
                        {/*
                    default address to login
                    when the address is wrong, it direct to login
                    */}
                        <Route component={Home}/>

                    </Switch>
                </div>
            </div>
        );
    }
}

export default Main;
