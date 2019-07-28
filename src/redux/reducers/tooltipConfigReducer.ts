import states from '../state';
import { TOOLTIP } from '../actionTypes';
import { TooltipConfig } from '../../interface';

interface IsTooltipConfig {
  tooltip: string,
  rootStyle?: object,
  icon?: string,
  iconStyle?: object,
  delay?: number
}

interface TooltipAction {
  type: string,
  data: IsTooltipConfig
};

export function tooltipConfig(state = states.tooltipConfig, action: TooltipAction): TooltipConfig {
  switch (action.type) {
    case TOOLTIP:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
