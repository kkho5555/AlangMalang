import {
    GameOptionType,
    GameResultType,
    GameSubjectType,
    GameType,
} from '../types';
export interface StateType {
    gameList: Array<GameType>;
    currentGame: GameType;
    currentGameSubject: GameSubjectType;
    currentGameOptionType: GameOptionType;
    currentTeamType: TeamType;
    currentGameResultType: GameResultType;
}
export interface ActionType {
    type: string;
    payload: {
        gameList: Array<GameType>;
    };
}
