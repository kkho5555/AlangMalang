import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    setMusicEnabled,
    setSoundEffectsEnabled,
    setMusicVolume,
    setEffectsVolume
} from '../features/environment/environmentSlice';
import { ScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function EnvironmentSettingsScreen({ navigation }: ScreenProps) {
    const dispatch = useAppDispatch();
    const { musicEnabled, soundEffectsEnabled, musicVolume, effectsVolume } =
        useAppSelector((state) => state.environment);

    const volumeLevels: { [key: string]: number } = {
        Off: 0,
        '30%': 0.3,
        '60%': 0.6,
        '100%': 1
    };

    const handleSetVolume = (type: any, level: any) => {
        const volume = volumeLevels[level];
        if (type === 'music') {
            dispatch(setMusicVolume(volume));
            dispatch(setMusicEnabled(volume > 0));
        } else {
            dispatch(setEffectsVolume(volume));
            dispatch(setSoundEffectsEnabled(volume > 0));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>환경설정</Text>

            <View style={styles.setting}>
                <Text>배경음악</Text>
                {Object.keys(volumeLevels).map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.button,
                            musicVolume === volumeLevels[level]
                                ? styles.buttonActive
                                : null
                        ]}
                        onPress={() => handleSetVolume('music', level)}
                    >
                        <Text>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.setting}>
                <Text>효과음</Text>
                {Object.keys(volumeLevels).map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.button,
                            effectsVolume === volumeLevels[level]
                                ? styles.buttonActive
                                : null
                        ]}
                        onPress={() => handleSetVolume('effects', level)}
                    >
                        <Text>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    setting: {
        marginBottom: 30
    },
    button: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginVertical: 4,
        width: 100,
        alignItems: 'center'
    },
    buttonActive: {
        backgroundColor: '#4caf50'
    }
});
