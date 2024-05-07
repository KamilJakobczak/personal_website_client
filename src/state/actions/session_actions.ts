import { ActionType } from '../action-types';

export interface CheckSessionAction {
  type: ActionType.CHECK_SESSION;
}
export interface CheckSessionCompleteAction {
  type: ActionType.CHECK_SESSION_COMPLETE;
  payload: {
    sessionId: string;
    autosave: boolean;
  };
}
export interface CheckSessionErrorAction {
  type: ActionType.CHECK_SESSION_ERROR;
  payload: {
    err: string;
  };
}

export interface CreateSessionAction {
  type: ActionType.CREATE_SESSION;
}

export interface CreateSessionCompleteAction {
  type: ActionType.CREATE_SESSION_COMPLETE;
  payload: {
    sessionId: string;
    autosave: boolean;
  };
}

export interface CreateSessionActionError {
  type: ActionType.CREATE_SESSION_ERROR;
  payload: {
    err: string;
  };
}

export type SessionActions =
  | CheckSessionAction
  | CheckSessionCompleteAction
  | CheckSessionErrorAction
  | CreateSessionAction
  | CreateSessionCompleteAction
  | CreateSessionActionError;
