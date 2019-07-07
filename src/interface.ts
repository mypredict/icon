import { selectAll } from "./redux/reducers/toolsReducer";

export interface State {
  projectId: '',
  projectName: '',
  bulkEdit: false,
  selectAll: false
}

export interface Navigation {
  primaryNavigation: string,
  secondaryNavigation: Array<string>
};

export declare interface BoolObj {
  [key: string]: boolean
};
