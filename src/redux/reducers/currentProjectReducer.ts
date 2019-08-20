import states from '../state';
import { CURRENT_PROJECT } from '../actionTypes';
import { CurrentProject, IconGroups } from '../../interface';

interface CurrentProjectData {
  id?: string,
  name?: string,
  type?: string,
  members?: Array<string>,
  icons?: Array<string>,
  iconGroups?: IconGroups,
  link?: string
}

interface CurrentProjectAction {
  type: string,
  data: CurrentProjectData
};

export function currentProject(
  state: CurrentProject = states.currentProject,
  action: CurrentProjectAction): CurrentProject {
  switch (action.type) {
    case CURRENT_PROJECT:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
