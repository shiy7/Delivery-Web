import React, {Component} from 'react';
import {Button} from "antd";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

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

    // goToShipping = () => {
    // // console.log(1);
    //     // return <NavLink  to="/shipping">ship</NavLink>;
    //     console.log(this.props.history);
    //     this.props.history.push(`/shipping`);
    //     // this.props.user = "abc123";
    // }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>Profile</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="history" />
                            <span>Order History</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Welcome, User</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                    </Content>
                </Layout>
            </Layout>
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

export default DashBoard;