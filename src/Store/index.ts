import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { rowsReducer } from './Slices/Row';

export const store = configureStore({
  reducer: {
    rows: rowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppSelector = typeof useAppSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
