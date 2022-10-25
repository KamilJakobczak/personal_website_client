import { ActionType } from '../action-types';
import { Action } from '../actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { codingApi } from '../server';
import { saveCells } from './cells';

export const createSession = (cookie?: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CREATE_SESSION });

    if (cookie) {
      dispatch({
        type: ActionType.CREATE_SESSION_COMPLETE,
        payload: {
          sessionId: cookie,
        },
      });
    } else {
      try {
        const { data } = await axios.get(`${codingApi}/cells/session`, {
          withCredentials: true,
        });
        if (data.sessionId) {
          setInterval(() => {
            saveCells();
          }, 6000);
        }
        dispatch({
          type: ActionType.CREATE_SESSION_COMPLETE,
          payload: {
            sessionId: data.sessionId,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          dispatch({
            type: ActionType.CREATE_SESSION_ERROR,
            payload: {
              err: err.message,
            },
          });
        }
      }
    }
  };
};
