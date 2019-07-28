import { combineReducers } from 'redux';

import { userMessage } from './userMessageReducer';
import { teamProjects } from './projectsReducer';
import { bulkEdit, selectAll } from './toolsReducer';
import { selectIcons } from './selectIconsReducer';
import { currentProject } from './currentProjectReducer';
import { tooltipConfig } from './tooltipConfigReducer';

export default combineReducers({
  userMessage,
  teamProjects,
  bulkEdit,
  selectAll,
  selectIcons,
  currentProject,
  tooltipConfig
});