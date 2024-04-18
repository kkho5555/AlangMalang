import React from 'react';
import { View, Text, Button } from 'react-native';
import { ScreenProps } from '../types';
import { useAppSelector } from '../app/hooks';

export default function EndGameScreen({ navigation }: ScreenProps) {
    const currentTeam = useAppSelector((state) => state.game.currentTeam);
    const currentGame = useAppSelector((state) => state.game.currentGame);
    const currentGameOption = useAppSelector(
        (state) => state.game.currentGameOption
    );
    const currentGameSubject = useAppSelector(
        (state) => state.game.currentGameSubject
    );
    const currentGameResult = useAppSelector(
        (state) => state.game.currentGameResult
    );

    console.log('Current Game:', currentGame);
    console.log('Current Game Option:', currentGameOption);
    console.log('Current Game Subject:', currentGameSubject);
    console.log('Current Game Result:', currentGameResult);

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Text>Current Game: {currentGame.title}</Text>
            <Text>Current Result: {currentGameResult.score}</Text>
            <Text style={{ fontWeight: 'bold' }}>EndGame Screen</Text>

            <Button
                title="Go to GameSelect"
                onPress={() => navigation.navigate('GameSelect')}
            />
        </View>
    );
}
