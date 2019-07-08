import states from '../state';
import { SELECT_ICONS } from '../actionTypes';

interface SelectIconsAction {
  type: string,
  data: Array<string>
};

export function selectIcons(state: Array<string> = states.selectIcons, action: SelectIconsAction): Array<string> {
  switch (action.type) {
    case SELECT_ICONS:
      return action.data;
    default:
      return state;
  }
}
