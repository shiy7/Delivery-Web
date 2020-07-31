import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Profile from "./Profile"
import OrderHistory from "./OrderHistory"
import {Route, Redirect, Switch, withRouter} from "react-router-dom"
import Link from "react-router-dom/Link"
const { Content, Sider } = Layout;

class DashBoard extends Component {
    state = {
        collapsed: false,
        orders:'',
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    render() {
        // console.log(localStorage.getItem("userID"));
        const path = this.props.location.pathname;

        return (
            localStorage.getItem("userID") !== null ?
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark"
                          selectedKeys={[path]}
                          mode="inline"
                    >
                        <Menu.Item key="/dashboard/profile">
                            <Link to='/dashboard/profile'>
                                <Icon type="user" />
                                <span>Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/dashboard/orders">
                            <Link to='/dashboard/orders'>
                                <Icon type="history" />
                                <span>Order History</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0', fontSize:"20px" }}>
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