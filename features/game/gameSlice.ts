import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { StateType, ActionType } from '../../app/store.d';
import {
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
    TeamType,
} from '../../types';
import { GameData } from '../../assets/data/games';

const initialState: StateType = {
    gameList: [],
    currentGame: {} as GameType,
    currentGameSubject: {} as GameSubjectType,
    currentGameOptionType: {} as GameOptionType,
    currentTeamType: {} as TeamType,
    currentGameResultType: {} as GameResultType,
};

export const fetchGameData = createAsyncThunk(
    'game/fetchGameData',
    async () => {
        return GameData;
    },
);

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<GameType>) => {
            state.currentGame = action.payload;
        },
        setGameSubject: (state, action: PayloadAction<GameSubjectType>) => {
            state.currentGameSubject = action.payload;
        },
        setGameOption: (state, action: PayloadAction<GameOptionType>) => {
            state.currentGameOptionType = action.payload;
        },
        setTeam: (state, action: PayloadAction<TeamType>) => {
            state.currentTeamType = action.payload;
        },
        setGameResult: (state, action: PayloadAction<GameResultType>) => {
            state.currentGameResultType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGameData.fulfilled, (state, action) => {
            state.gameList = action.payload;
        });
    },
});

export const {
    setGame,
    setGameSubject,
    setGameOption,
    setTeam,
    setGameResult,
} = gameSlice.actions;
