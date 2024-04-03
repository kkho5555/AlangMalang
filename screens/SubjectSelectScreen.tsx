// SubjectSelectScreen

import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { GameSubjectType, ScreenProps } from '../types';
import { setGameSubject } from '../features/game/gameSlice';
import { useAppSelector } from '../app/hooks';

export default function SubjectSelectScreen({ navigation }: ScreenProps) {
    // choice Game Subject
    const gameSubject: GameSubjectType = {
        game: useAppSelector((state) => state.currentGame),
        subject: '',
    };
    return (
        <View className="flex items-center justify-center">
            <Text className="font-bold">GameSetting Screen</Text>
            <Text className="font-bold text-lg">Game Subject</Text>
            <Button
                title="동물"
                onPress={() => {
                    setGameSubject({ ...gameSubject, subject: '동물' });
                }}
            />
            <Button
                title="영화"
                onPress={() => {
                    setGameSubject({ ...gameSubject, subject: '영화' });
                }}
            />
            <Button
                title="가수"
                onPress={() => {
                    setGameSubject({ ...gameSubject, subject: '가수' });
                }}
            />
            <Button
                title="게임설정으로 이동"
                onPress={() => {
                    navigation.navigate('GameSettings');
                }}
            />
            <Button
                title="게임시작"
                onPress={() => {
                    navigation.navigate('InGame');
                }}
            />
        </View>
    );
}
