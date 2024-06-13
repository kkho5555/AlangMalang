export interface ApiResponseSuccess<T> {
    result: 'SUCCESS';
    code: number;
    data: T;
    timestamp: string;
}

export interface ApiResponseFail {
    result: 'FAIL';
    error: {
        code: string;
        decs: string;
    };
}

export interface LoginRequest {
    id: string;
}

export interface LoginResponse {
    id: string;
    team: {
        teamId: number;
        teamName: string;
    }[];
    game: {
        gameId: number;
        gameName: string;
        comment: string;
        gameImg: string;
    }[];
}

export interface AddTeamRequest {
    userId: string;
    teamName: string;
}

export interface AddTeamResponse {
    teamId: number;
    teamName: string;
}

export interface DeleteTeamResponse {
    teamId: number;
    teamName: string;
}

export interface UpdateTeamRequest {
    userId: string;
    teamId: number;
    teamName: string;
}

export interface UpdateTeamResponse {
    teamId: number;
    teamName: string;
}

export interface TopicListResponse {
    topicId: number;
    topicName: string;
    topicImg: string;
    onBoard: boolean;
}

export interface StartGameResponse {
    topicDataId: number;
    topicDataName: string;
}

export interface EndGameRequest {
    userId: string;
    gameId: number;
    topicId: number;
    teamId: number;
    level: string;
    playTime: number;
    setPass: number;
    usePass: number;
    score: number;
}

export interface EndGameResponse {
    teamName: string;
    topicName: string;
    level: string;
    playTime: number;
    score: number;
    rank: number;
}

export interface RankResponse {
    teamName: string;
    playCount: number;
    totalScore: number;
    totalRank: number;
    detail: {
        gameName: string;
        topicName: string;
        playTime: number;
        level: string;
        score: number;
        rank: number;
    }[];
}
