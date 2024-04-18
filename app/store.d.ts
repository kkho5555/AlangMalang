import {
    GameDataType,
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
    RankType
} from '../types';

export interface StateType {
    gameList: Array<GameType>;
    gameData: Array<GameDataType>;
    rankData: RankType;
    currentGameData: GameDataType;
    currentGame: GameType;
    currentGameSubject: GameSubjectType;
    currentGameOption: GameOptionType;
    currentTeam: TeamType;
    currentGameResult: GameResultType;
}
export interface ActionType {
    type: string;
    payload: {
        gameList: Array<GameType>;
    };
}
