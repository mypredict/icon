import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);