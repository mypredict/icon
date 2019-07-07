import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './App';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route path="/home" component={App} />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
