import React from 'react';
import { View, Text, Button } from 'react-native';
import { GameOptionType, ScreenProps } from '../types';
import { setGameOption } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function GameSettingsScreen({ navigation }: ScreenProps) {
    const gameOption: GameOptionType = {
        difficulty: 'easy',
        game: useAppSelector((state) => state.game.currentGame),
        passLimit: 3,
        playTime: 30,
        subject: useAppSelector((state) => state.game.currentGameSubject)
    };
    const dispatch = useAppDispatch();
    return (
        <View className="flex items-center justify-center">
            <Text className="font-bold">GameSetting Screen</Text>
            {/* choice difficulty */}
            <Text className="font-bold text-lg">Difficulty</Text>
            <Button
                title="Easy"
                onPress={() => {
                    dispatch(
                        setGameOption({ ...gameOption, difficulty: 'easy' })
                    );
                }}
            />
            <Button
                title="Normal"
                onPress={() => {
                    dispatch(
                        setGameOption({ ...gameOption, difficulty: 'normal' })
                    );
                }}
            />
            <Button
                title="Hard"
                onPress={() => {
                    dispatch(
                        setGameOption({ ...gameOption, difficulty: 'hard' })
                    );
                }}
            />
            {/* choice passLimit */}
            <Text className="font-bold text-lg">Pass Limit</Text>
            <Button
                title="1"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, passLimit: 3 }));
                }}
            />
            <Button
                title="2"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, passLimit: 5 }));
                }}
            />
            <Button
                title="3"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, passLimit: 7 }));
                }}
            />
            {/* choide play time */}
            <Text className="font-bold text-lg">Play Time</Text>
            <Button
                title="30"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, playTime: 30 }));
                }}
            />
            <Button
                title="60"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, playTime: 60 }));
                }}
            />
            <Button
                title="90"
                onPress={() => {
                    dispatch(setGameOption({ ...gameOption, playTime: 90 }));
                }}
            />
            <Button title="설정 완료" onPress={() => navigation.goBack()} />
        </View>
    );
}
