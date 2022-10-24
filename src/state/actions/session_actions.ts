import { ActionType } from '../action-types';
export interface CreateSessionAction {
  type: ActionType.CREATE_SESSION;
  payload: {
    sessionId: string;
  };
}

export interface CreateSessionActionError {
  type: ActionType.CREATE_SESSION_ERROR;
  payload: {
    err: string;
  };
}

export type SessionActions = CreateSessionAction | CreateSessionActionError;
