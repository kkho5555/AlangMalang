import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnvironmentState {
    musicEnabled: boolean;
    soundEffectsEnabled: boolean;
    musicVolume: number;
    effectsVolume: number;
}

const initialState: EnvironmentState = {
    musicEnabled: true,
    soundEffectsEnabled: true,
    musicVolume: 0.5,
    effectsVolume: 0.5
};

export const environmentSlice = createSlice({
    name: 'environment',
    initialState,
    reducers: {
        setMusicEnabled: (state, action: PayloadAction<boolean>) => {
            state.musicEnabled = action.payload;
        },
        setSoundEffectsEnabled: (state, action: PayloadAction<boolean>) => {
            state.soundEffectsEnabled = action.payload;
        },
        setMusicVolume: (state, action: PayloadAction<number>) => {
            state.musicVolume = action.payload;
        },
        setEffectsVolume: (state, action: PayloadAction<number>) => {
            state.effectsVolume = action.payload;
        }
    }
});

export const {
    setMusicEnabled,
    setSoundEffectsEnabled,
    setMusicVolume,
    setEffectsVolume
} = environmentSlice.actions;
