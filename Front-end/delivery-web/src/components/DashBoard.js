import React, {Component} from 'react';
import {Button} from "antd";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Profile from "./Profile"
import OrderHistory from "./OrderHistory"
import {Route, Redirect, Switch, withRouter} from "react-router-dom"
import Link from "react-router-dom/Link"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class DashBoard extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    // componentDidMount() {
    //     if(localStorage.getItem("userID") == null){
    //         this.props.history.push(`/login`);
    //     }
    // }

    // goToShipping = () => {
    // // console.log(1);
    //     // return <NavLink  to="/shipping">ship</NavLink>;
    //     console.log(this.props.history);
    //     this.props.history.push(`/shipping`);
    //     // this.props.user = "abc123";
    // }

    render() {
        // console.log(localStorage.getItem("userID"));
        return (
            localStorage.getItem("userID") !== null ?
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to='/dashboard/profile'>
                                <Icon type="user" />
                                <span>Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='/dashboard/orders'>
                                <Icon type="history" />
                                <span>Order History</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Welcome, {localStorage.getItem("userID")}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route path='/dashboard/profile' component={Profile}/>
                                <Route path='/dashboard/orders' component={OrderHistory}/>
                                <Redirect to='/dashboard/profile'/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout> : <Redirect to='/'/>
            // <div>
            //
            //         {/*<NavLink  to="/shipping">ship</NavLink>*/}
            //         {/*<Button >View my order</Button>*/}
            //         {/*<Button onClick={this.goToShipping}>Ship my items</Button>*/}
            //
            // </div>
        );
    }
}

export default withRouter (DashBoard);