import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import { StateType, ActionType } from './store.d';
import { GameType } from '../types';
import { useDispatch } from 'react-redux';
import { gameSlice } from '../features/game/gameSlice';

const store = configureStore({
    reducer: gameSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
