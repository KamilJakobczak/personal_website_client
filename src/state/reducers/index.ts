import cellsReducer from './cellsReducer';
import { combineReducers } from 'redux';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;
