import { combineReducers } from 'redux';

import { teamProjects, personalProjects } from './projectsReducer';
import { bulkEdit, selectAll } from './toolsReducer';
import { selectIcons } from './selectIconsReducer';
import { currentProject } from './currentProjectReducer';

export default combineReducers({
  teamProjects,
  personalProjects,
  bulkEdit,
  selectAll,
  selectIcons,
  currentProject
});