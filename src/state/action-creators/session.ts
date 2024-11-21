import { ActionType } from '../action-types';
import { Action } from '../actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { codingApi } from '../../server';
import { saveCells } from './cells';

export const createSession = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CREATE_SESSION });

    try {
      const { data } = await axios.post(`${codingApi}/cells/session`, {
        withCredentials: true,
      });
      if (data.sessionId) {
        setInterval(() => {
          saveCells();
        }, 12000);
      }
      dispatch({
        type: ActionType.CREATE_SESSION_COMPLETE,
        payload: {
          sessionId: data.sessionId,
          autosave: data.autosave,
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
      // }
    }
  };
};
export const checkSession = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CHECK_SESSION });

    try {
      const { data } = await axios.get(`${codingApi}/cells/session`, {
        withCredentials: true,
      });
      if (data.sessionId) {
        setInterval(() => {
          saveCells();
        }, 12000);
      }
      dispatch({
        type: ActionType.CHECK_SESSION_COMPLETE,
        payload: {
          sessionId: data.sessionId,
          autosave: data.autosave,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        dispatch({
          type: ActionType.CHECK_SESSION_ERROR,
          payload: {
            err: err.message,
          },
        });
      }
    }
  };
};
