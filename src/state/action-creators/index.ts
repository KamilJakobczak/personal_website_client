import axios from 'axios';
import { Dispatch } from 'redux';
import Bundler from '../../components/Projects/coding_playground/bundler';
import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { Cell, CellTypes } from '../cell';

import { codingApi } from '../server';
import { RootState } from '../store';

export const createSession = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`${codingApi}/cells/session`, {
        withCredentials: true,
      });

      dispatch({
        type: ActionType.CREATE_SESSION,
        payload: {
          sessionId: data.sessionId,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
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

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};
export const moveCell = (
  id: string,

  direction: Direction
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,

      direction,
    },
  };
};
export const updateCell = (
  id: string,

  content: string
): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,

      content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await Bundler(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get(`${codingApi}/cells`);

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    console.log(getState());
    const {
      cells: { data, order },
      session: { sessionId },
    } = getState();
    const cells = order.map((id: string) => data[id]);

    try {
      await axios.post(
        `${codingApi}/cells/${sessionId}`,
        { cells },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
