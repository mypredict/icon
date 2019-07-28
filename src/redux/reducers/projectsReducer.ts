import states from '../state';
import { TEAM_PROJECTS } from '../actionTypes';

interface ProjectsAction {
  type: string,
  data: Array<string>
};

export function teamProjects(state: Array<string> = states.teamProjects, action: ProjectsAction): Array<string> {
  switch (action.type) {
    case TEAM_PROJECTS:
      return action.data;
    default:
      return state;
  }
}
