import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { environmentSlice } from '../features/environment/environmentSlice';
import { gameSlice } from '../features/game/gameSlice';

const rootReducer = combineReducers({
    game: gameSlice.reducer,
    environment: environmentSlice.reducer
});
const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
