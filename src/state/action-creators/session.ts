import { ActionType } from '../action-types';
import { Action } from '../actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { codingApi } from '../server';
import { saveCells } from './cells';

export const createSession = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`${codingApi}/cells/session`, {
        withCredentials: true,
      });
      setInterval(() => {
        saveCells();
      }, 6000);
      dispatch({
        type: ActionType.CREATE_SESSION,
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
  };
};
