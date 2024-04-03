// create main navigator
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import GameSettingsScreen from '../screens/GameSettingsScreen';
import GameSelectScreen from '../screens/GameSelectScreen';
import InGameScreen from '../screens/InGameScreen';
import EndGameScreen from '../screens/EndGameScreen';
import SubjectSelectScreen from '../screens/SubjectSelectScreen';
import PlayerSettingsScreen from '../screens/PlayerSettingsScreen';

const Stack = createNativeStackNavigator();
//RootStackParamList
export type RootStackParamList = {
    Main: undefined;
    GameSettings: undefined;
    GameSelect: undefined;
    SubjectSelect: undefined;
    InGame: undefined;
    EndGame: undefined;
};

export default function MainNavigator(prop: { onLayout: () => void }) {
    prop.onLayout();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{ headerShown: false, statusBarHidden: true }}
            >
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen
                    name="GameSettings"
                    component={GameSettingsScreen}
                />
                <Stack.Screen name="GameSelect" component={GameSelectScreen} />
                <Stack.Screen
                    name="SubjectSelect"
                    component={SubjectSelectScreen}
                />
                <Stack.Screen
                    name="PlayerSettings"
                    component={PlayerSettingsScreen}
                />
                <Stack.Screen name="InGame" component={InGameScreen} />
                <Stack.Screen name="EndGame" component={EndGameScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
