import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './style/index.less';
import CommunityHeader from './common/header';
import CommunityHome from './pages/home';

const { Header } = Layout;

function App() {
  return (
    <HashRouter>
        <Layout className="layout-wrapper">
          <Header className="layout-header">
            <CommunityHeader/>
          </Header>
          <Switch>
            <Route path="/" component={CommunityHome}></Route>
          </Switch>
        </Layout>
    </HashRouter>
  );
}

export default App;
