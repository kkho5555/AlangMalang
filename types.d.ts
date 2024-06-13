import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigators/MainNavigator';

export type ScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Main',
    'GameSettings',
    'GameSelect',
    'InGame',
    'EndGame',
    'PlayerSettings',
    'SubjectSelect',
    'OverallRanking'
>;

export type GameDataType = {
    id: number;
    subject: string;
    name: string;
    data: Array<{
        difficulty: string;
        words: string[];
    }>;
};
export type GameType = {
    id: number;
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
    playTime: number;
    subject: GameSubjectType;
    difficulty: 'easy' | 'normal' | 'hard';
    passLimit: number;
};
export type GameResultType = {
    game: GameType;
    subject: GameSubjectType;
    option: GameOptionType;
    score: number;
    playedAt: Date;
};
export type TeamType = {
    id: number;
    name: string;
    teamColor: string;
};
export type RankType = Array<{
    teamId: TeamType['id'];
    results: GameResultType[];
}>;

export interface ScreenProps {
    navigation: ScreenNavigationProp;
}
