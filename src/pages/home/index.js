import React from 'react';
import { Layout } from 'antd';
import './index.less';
import CardList from './cardList';
import HotPoint from './hotPoint';
import HotWriter from './hotWriter';

const { Sider, Content } = Layout;

function Home () {
    return (
        <Layout className="layout-content">
            <Content className="left-content">
                <CardList />
            </Content>
            <Sider className="right-side">
                <HotPoint />
                <HotWriter />
            </Sider>
        </Layout>
    )
}

export default Home;