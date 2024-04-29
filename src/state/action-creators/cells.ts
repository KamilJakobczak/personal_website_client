import axios from 'axios';
import {
  Action,
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { ActionType } from '../action-types';
import { Cell, CellTypes } from '../cell';
import { Dispatch } from 'redux';
import { codingApi } from '../../server';
import { RootState } from '../store';

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const fetchCells = (cookie?: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    const {
      session: { sessionId },
    } = getState();

    try {
      const { data }: { data: Cell[] } = await axios.get(
        `${codingApi}/cells/${sessionId}`
      );

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

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
      session: { sessionId },
    } = getState();
    const cells = order.map((id: string) => data[id]);

    try {
      console.log(sessionId);
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
