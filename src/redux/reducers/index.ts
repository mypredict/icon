import { combineReducers } from 'redux';

import { bulkEdit, selectAll } from './toolsReducer';

export default combineReducers({
  bulkEdit,
  selectAll
});