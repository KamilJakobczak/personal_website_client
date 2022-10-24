import produce from 'immer';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Session } from '../session';

interface SessionState {
  sessionId: string | null;
  error: string | null;
}

const initialState: SessionState = {
  sessionId: null,
  error: null,
};

const reducer = produce(
  (state: SessionState = initialState, action: Action): SessionState | void => {
    switch (action.type) {
      case ActionType.CREATE_SESSION:
        const session: Session = {
          id: action.payload.sessionId,
        };

        state.error = null;
        state.sessionId = session.id;
        return state;
      case ActionType.CREATE_SESSION_ERROR:
        state.error = action.payload.err;
        return state;

      default:
        return state;
    }
  }
);

export default reducer;
