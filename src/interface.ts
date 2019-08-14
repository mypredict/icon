export interface UserMessage {
  username: string,
  userId: string,
  avatar: string,
  personalProjects: Array<string>,
  teamProjects: Array<string>
}

export interface CurrentProject {
  id: string,
  name: string,
  type: string,
  iconType: string,
  members: Array<string>,
  icons: Array<string>,
  link: string
}

export interface TooltipConfig {
  tooltip: string,
  rootStyle: Object,
  icon: string,
  iconStyle: Object,
  delay: number
}

export interface State {
  teamProjects: Array<string>,
  tooltipConfig: TooltipConfig,
  bulkEdit: boolean,
  selectAll: boolean,
  selectIcons: Array<string>,
  currentProject: CurrentProject,
  userMessage: UserMessage,
  iconBgc: string
}

export interface Navigation {
  type: 'team' | 'personal',
  primaryNavigation: string,
  secondaryNavigation: Array<string>
};

export declare interface BoolObj {
  [key: string]: boolean
};

export interface Action {
  type: string,
  data?: any
}

export interface Fetch {
  url: string,
  method: 'get' | 'post'
}

export interface Response {
  state: 'success' | 'error',
  result: any
}
