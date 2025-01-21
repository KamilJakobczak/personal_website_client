import { saveCells } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { AppDispatch, RootState } from '../index';

export const persistMiddleware: any = ({
  dispatch,
  getState,
}: {
  dispatch: AppDispatch;
  getState: () => RootState;
}) => {
  let timer: any;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [ActionType.MOVE_CELL, ActionType.INSERT_CELL_AFTER, ActionType.DELETE_CELL, ActionType.UPDATE_CELL].includes(
          action.type
        )
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 500);
      }

      if (ActionType.UPDATE_CELL) {
      }
    };
  };
};
