import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={App} />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
