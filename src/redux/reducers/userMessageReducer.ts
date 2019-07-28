import states from '../state';
import { USER_MESSAGE } from '../actionTypes';
import { UserMessage } from '../../interface';

interface UserMessageData {
  username?: string,
  userId?: string,
  avatar?: string,
  personalProjects?: Array<string>
}

interface UserMessageAction {
  type: string,
  data: UserMessageData
};

export function userMessage(
  state: UserMessage = states.userMessage,
  action: UserMessageAction): UserMessage {
  switch (action.type) {
    case USER_MESSAGE:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
