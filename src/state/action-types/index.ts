export enum ActionType {
  CHECK_SESSION = 'check_session',
  CHECK_SESSION_COMPLETE = 'check_session_complete',
  CHECK_SESSION_ERROR = 'check_session_error',

  CREATE_SESSION = 'create_session',
  CREATE_SESSION_COMPLETE = 'create_session_complete',
  CREATE_SESSION_ERROR = 'create_session_error',

  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',

  MOVE_CELL = 'move_cell',
  DELETE_CELL = 'delete_cell',
  INSERT_CELL_AFTER = 'insert_cell_after',
  UPDATE_CELL = 'update_cell',
  FETCH_CELLS = 'fetch_cells',
  FETCH_CELLS_COMPLETE = 'fetch_cells_complete',
  FETCH_CELLS_ERROR = 'fetch_cells_error',
  SAVE_CELLS_ERROR = 'save_cells_error',
  // AUTOSAVE_CELLS = 'autosave_cells',
}
