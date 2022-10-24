import cellsReducer from './cellsReducer';
import { combineReducers } from 'redux';
import bundlesReducer from './bundlesReducer';
import sessionReducers from './sessionReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
  session: sessionReducers,
});

export default reducers;
