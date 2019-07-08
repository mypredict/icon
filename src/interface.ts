import { selectAll } from "./redux/reducers/toolsReducer";

export interface CurrentProject {
  id: string,
  name: string,
  type: string,
  members: Array<string>,
  icons: Array<string>,
  link: string
}

export interface State {
  teamProjects: Array<string>,
  personalProjects: Array<string>,
  bulkEdit: boolean,
  selectAll: boolean,
  selectIcons: Array<string>,
  currentProject: CurrentProject
}

export interface Navigation {
  primaryNavigation: string,
  secondaryNavigation: Array<string>
};

export declare interface BoolObj {
  [key: string]: boolean
};
