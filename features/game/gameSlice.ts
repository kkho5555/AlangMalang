// gameSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    addTeam,
    deleteTeam,
    endGame,
    getRank,
    getTopicList,
    login,
    resetRank,
    startGame,
    updateTeam
} from '../../app/api';
import {
    AddTeamRequest,
    EndGameRequest,
    LoginRequest,
    UpdateTeamRequest
} from '../../app/api.d';
import { StateType } from '../../app/store.d';
import {
    GameDataType,
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
    TeamType
} from '../../types';

const initialState: StateType = {
    gameList: [],
    gameData: [],
    rankData: [],
    topicList: [],
    currentGameData: {} as GameDataType,
    currentGame: {} as GameType,
    currentGameSubject: {} as GameSubjectType,
    currentGameOption: {} as GameOptionType,
    currentTeam: {} as TeamType,
    currentGameResult: {} as GameResultType,
    teamList: [],
    loadingTeams: false,
    teamError: null
};

export const loginUser = createAsyncThunk(
    'game/loginUser',
    async (data: LoginRequest) => {
        const response = await login(data);
        return response;
    }
);

export const createTeam = createAsyncThunk(
    'game/createTeam',
    async (data: AddTeamRequest) => {
        const response = await addTeam(data);
        return response;
    }
);

export const removeTeam = createAsyncThunk(
    'game/removeTeam',
    async ({ userId, teamId }: { userId: string; teamId: number }) => {
        const response = await deleteTeam(userId, teamId);
        return response;
    }
);

export const modifyTeam = createAsyncThunk(
    'game/modifyTeam',
    async (data: UpdateTeamRequest) => {
        const response = await updateTeam(data);
        return response;
    }
);

export const fetchTopicList = createAsyncThunk(
    'game/fetchTopicList',
    async (gameId: number) => {
        const response = await getTopicList(gameId);
        return response;
    }
);

export const beginGame = createAsyncThunk(
    'game/beginGame',
    async ({ topicId, level }: { topicId: number; level: string }) => {
        const response = await startGame(topicId, level);
        return response;
    }
);

export const completeGame = createAsyncThunk(
    'game/completeGame',
    async (data: EndGameRequest) => {
        const response = await endGame(data);
        return response;
    }
);

export const fetchRank = createAsyncThunk(
    'game/fetchRank',
    async (userId: string) => {
        const response = await getRank(userId);
        return response;
    }
);

export const resetUserRank = createAsyncThunk(
    'game/resetUserRank',
    async (userId: string) => {
        await resetRank(userId);
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
        setGameList: (state, action: PayloadAction<GameType[]>) => {
            state.gameList = action.payload;
        },
        setTeams: (state, action: PayloadAction<TeamType[]>) => {
            state.teamList = action.payload;
            console.log('state.teamList', state.teamList);
        },
        setCurrentTeam: (state, action: PayloadAction<TeamType>) => {
            state.currentTeam = action.payload;
        },
        pushGameResult: (
            state,
            action: PayloadAction<{ teamId: number; result: GameResultType }>
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
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // Handle login response if needed
        });
        builder.addCase(createTeam.fulfilled, (state, action) => {
            // Handle create team response if needed
        });
        builder.addCase(removeTeam.fulfilled, (state, action) => {
            // Handle remove team response if needed
        });
        builder.addCase(modifyTeam.fulfilled, (state, action) => {
            // Handle modify team response if needed
        });
        builder.addCase(fetchTopicList.fulfilled, (state, action) => {
            state.topicList = action.payload ?? [];
        });
        builder.addCase(beginGame.fulfilled, (state, action) => {
            // state.currentGameData = action.payload ?? [];
        });
        builder.addCase(completeGame.fulfilled, (state, action) => {
            // Handle complete game response if needed
        });
        builder.addCase(fetchRank.fulfilled, (state, action) => {
            // Handle fetch rank response if needed
        });
        builder.addCase(resetUserRank.fulfilled, (state, action) => {
            // Handle reset rank response if needed
        });
    }
});

export const {
    setGame,
    setGameData,
    setGameList,
    setTeams,
    pushGameResult,
    setGameSubject,
    setGameOption,
    setGameResult,
    setCurrentTeam
} = gameSlice.actions;

export default gameSlice.reducer;
