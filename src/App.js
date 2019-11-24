import React, { useReducer, createContext } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { reducer, initialState } from './store/reducer';
import './style/index.less';
import CommunityHeader from './common/header';
import CommunityHome from './pages/home';
import Publish from './pages/publish';
import Login from './pages/login';


function App() {
  const { Header } = Layout;
  const { Provider } = AppContext;
  const store = useReducer(reducer, initialState);

  return (
    <Provider value={store}>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/" render={() => (
            <Layout className="layout-wrapper">
              <Header className="layout-header">
                <CommunityHeader/>
              </Header>
              <Switch>
                <Route path="/home" component={CommunityHome}></Route>
                <Route path="/publish" component={Publish}></Route>
                <Redirect from="/*" to="/home"></Redirect>
              </Switch>
            </Layout>)}>
          </Route>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export const AppContext = createContext({});
export default App;
