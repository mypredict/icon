import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Head from './components/sidebar/Head';
import Menu from './components/sidebar/Menu';
import IconContent from './components/IconContent';
import Login from './components/Login';
import Config from './components/Config';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <aside className="sidebar-page">
        <Head />
        <Menu />
      </aside>
      <Switch>
        <Route path="/icon" component={IconContent} />
        <Route path="/login" component={Login} />
        <Route path="/config" component={Config} />
        <Redirect to="/icon" />
      </Switch>
    </>
  );
};

export default App;
