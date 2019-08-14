import states from '../state';
import { ICON_BGC } from '../actionTypes';

interface IconBgcAction {
  type: string,
  data: string
};

export function iconBgc(state: string = states.iconBgc, action: IconBgcAction): string {
  switch (action.type) {
    case ICON_BGC:
      return action.data;
    default:
      return state;
  }
}