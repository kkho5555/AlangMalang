import {
    GameDataType,
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
    RankType
} from '../types';
import { TopicListResponse } from './api.d';

export interface StateType {
    gameList: Array<GameType>;
    gameData: Array<GameDataType>;
    rankData: RankType;
    topicList: Array<TopicListResponse>;
    currentGameData: GameDataType;
    currentGame: GameType;
    currentGameSubject: GameSubjectType;
    currentGameOption: GameOptionType;
    currentTeam: TeamType;
    currentGameResult: GameResultType;
    teamList: Array<TeamType>;
    loadingTeams: boolean;
    teamError: null | string;
}
export interface ActionType {
    type: string;
    payload: {
        gameList: Array<GameType>;
    };
}
