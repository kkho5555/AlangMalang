import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamType } from '../../types';

const initialState: { currentTeam: TeamType | undefined } = {
    currentTeam: undefined
};

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeam: (state, action: PayloadAction<TeamType>) => {
            state.currentTeam = action.payload;
        }
    }
});

export const { setTeam } = teamSlice.actions;
