import produce from 'immer';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Session } from '../session';

interface SessionState {
  error: string | null;
  loading: boolean;
  sessionId: string | null;
}

const initialState: SessionState = {
  error: null,
  loading: false,
  sessionId: null,
};

const reducer = produce(
  (state: SessionState = initialState, action: Action): SessionState | void => {
    switch (action.type) {
      case ActionType.CHECK_SESSION:
        state.loading = true;
        state.error = null;
        return state;
      case ActionType.CHECK_SESSION_COMPLETE:
        const checkSession: Session = {
          id: action.payload.sessionId,
        };
        state.loading = false;
        state.error = null;
        state.sessionId = checkSession.id;
        return state;
      case ActionType.CHECK_SESSION_ERROR:
        state.loading = false;
        state.error = action.payload.err;
        return state;
      case ActionType.CREATE_SESSION:
        state.loading = true;
        state.error = null;
        return state;
      case ActionType.CREATE_SESSION_COMPLETE:
        const session: Session = {
          id: action.payload.sessionId,
        };
        state.loading = false;
        state.error = null;
        state.sessionId = session.id;
        return state;

      case ActionType.CREATE_SESSION_ERROR:
        state.loading = false;
        state.error = action.payload.err;
        return state;

      default:
        return state;
    }
  }
);

export default reducer;
