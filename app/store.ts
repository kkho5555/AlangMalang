import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../features/game/gameSlice';
import { teamSlice } from '../features/team/teamSlice';

const rootReducer = combineReducers({
    game: gameSlice.reducer,
    team: teamSlice.reducer
});
const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
