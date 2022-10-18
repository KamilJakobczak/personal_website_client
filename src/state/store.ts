import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
