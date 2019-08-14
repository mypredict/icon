import {
  BULK_EDIT,
  SELECT_ALL,
  SELECT_ICONS,
  TEAM_PROJECTS,
  CURRENT_PROJECT,
  USER_MESSAGE,
  TOOLTIP,
  ICON_BGC
} from './actionTypes';
import { CurrentProject, UserMessage } from '../interface';

// 批量编辑状态控制
export const bulkEditCreator: Function = (status: boolean): object => ({
  type: BULK_EDIT,
  data: status
});

// 全选控制
export const selectAllCreator: Function = (status: boolean): object => ({
  type: SELECT_ALL,
  data: status
});

// 选中的图标
export const selectIconsCreator: Function = (icons: Array<string>): object => ({
  type: SELECT_ICONS,
  data: icons
});

// 所有团队项目
export const teamProjectsCreator: Function = (teamProjects: Array<string>): object => ({
  type: TEAM_PROJECTS,
  data: teamProjects
});

// 当前项目
export const currentProjectCreator: Function = (currentProject: CurrentProject): object => ({
  type: CURRENT_PROJECT,
  data: currentProject
});

// 个人信息
export const userMessageCreator: Function = (userMessage: UserMessage): object => ({
  type: USER_MESSAGE,
  data: userMessage
});

interface IsTooltipConfig {
  tooltip: string,
  rootStyle?: object,
  icon?: string,
  iconStyle?: object,
  delay?: number
}

// 提示框
export const tooltipConfigCreator: Function = (tooltipConfig: IsTooltipConfig): object => ({
  type: TOOLTIP,
  data: tooltipConfig
});

// 图标背景色
export const iconBgcCreator: Function = (iconBgc: string): object => ({
  type: ICON_BGC,
  data: iconBgc
})
