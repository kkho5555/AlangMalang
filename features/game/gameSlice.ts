import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from '../../app/store.d';
import { gameData } from '../../assets/data/game_data';
import {
    GameDataType,
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
    TeamType
} from '../../types';
import { GameList } from '../../assets/data/games';

const initialState: StateType = {
    gameList: [],
    gameData: [],
    rankData: [],
    currentGameData: {} as GameDataType,
    currentGame: {} as GameType,
    currentGameSubject: {} as GameSubjectType,
    currentGameOption: {} as GameOptionType,
    currentTeam: {} as TeamType,
    currentGameResult: {} as GameResultType
};

export const fetchGameData = createAsyncThunk<[GameType[], GameDataType[]]>(
    'game/fetchGameData',
    async () => {
        return [GameList, gameData];
    }
);

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<GameType>) => {
            state.currentGame = action.payload;
        },
        setGameData: (state, action: PayloadAction<GameDataType>) => {
            state.currentGameData = action.payload;
        },
        pushGameResult: (
            state,
            action: PayloadAction<{ teamId: string; result: GameResultType }>
        ) => {
            const { teamId, result } = action.payload;
            const team = state.rankData.find((team) => team.teamId === teamId);
            if (team) {
                team.results.push(result);
            } else {
                state.rankData.push({
                    teamId,
                    results: [result]
                });
            }
        },
        setGameSubject: (state, action: PayloadAction<GameSubjectType>) => {
            state.currentGameSubject = action.payload;
        },
        setGameOption: (state, action: PayloadAction<GameOptionType>) => {
            state.currentGameOption = action.payload;
        },
        setGameResult: (state, action: PayloadAction<GameResultType>) => {
            state.currentGameResult = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGameData.fulfilled, (state, action) => {
            [state.gameList, state.gameData] = action.payload;
        });
    }
});

export const {
    setGame,
    setGameData,
    pushGameResult,
    setGameSubject,
    setGameOption,
    setGameResult
} = gameSlice.actions;
