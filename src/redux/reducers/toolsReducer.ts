import states from '../state';
import { BULK_EDIT, SELECT_ALL } from '../actionTypes';

interface ToolsStatusAction {
  type: string,
  data: boolean
};

export function bulkEdit(state: boolean = states.bulkEdit, action: ToolsStatusAction): boolean {
  switch (action.type) {
    case BULK_EDIT:
      return action.data;
    default:
      return state;
  }
}

export function selectAll(state: boolean = states.selectAll, action: ToolsStatusAction): boolean {
  switch (action.type) {
    case SELECT_ALL:
      return action.data;
    default:
      return state;
  }
}
