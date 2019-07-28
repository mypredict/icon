import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Head from './components/sidebar/Head';
import Menu from './components/sidebar/Menu';
import IconContent from './components/IconContent';
import Login from './components/Login';
import Config from './components/Config';
import Tooltip from './components/basic_components/tooltip/Tooltip';
import './App.scss';

interface Props {
  history: any
}

const App = (props: Props) => {
  return (
    <>
      <Tooltip />
      <aside className="sidebar-page">
        <Head history={props.history} />
        <Menu history={props.history} />
      </aside>
      <Switch>
        <Route path="/icon" component={IconContent} history={props.history} />
        <Route path="/login" component={Login} history={props.history} />
        <Route path="/config" component={Config} history={props.history} />
        <Redirect to="/icon" />
      </Switch>
    </>
  );
};

export default withRouter(App);
