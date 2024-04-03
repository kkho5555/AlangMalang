import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigators/MainNavigator';
export type ScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Main',
    'GameSettings',
    'GameSelect',
    'InGame',
    'EndGame'
>;

export type GameType = {
    num: number;
    bgColor1: string;
    bgColor2: string;
    title: string;
    type: string;
    gameManual: {
        tester: string;
        participant: string;
    };
    headCount: {
        min: number;
        max: number;
    };
    imgPath: any;
};
export type GameSubjectType = {
    game: GameType;
    subject: string;
};
export type GameOptionType = {
    game: GameType;
    playTime: 30 | 60 | 90;
    subject: GameSubjectType;
    difficulty: 'easy' | 'normal' | 'hard';
    passLimit: number;
};
export type TeamType = {
    name: string;
    gameRecords: Array<GameResultType>;
    teamColor: string;
};
export type GameResultType = {
    game: GameType;
    subject: GameSubjectType;
    option: GameOptionType;
    score: number;
    playedAt: Date;
};

export interface ScreenProps {
    navigation: ScreenNavigationProp;
}
