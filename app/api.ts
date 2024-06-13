import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
    AddTeamRequest,
    AddTeamResponse,
    ApiResponseFail,
    ApiResponseSuccess,
    DeleteTeamResponse,
    EndGameRequest,
    EndGameResponse,
    LoginRequest,
    LoginResponse,
    RankResponse,
    StartGameResponse,
    TopicListResponse,
    UpdateTeamRequest,
    UpdateTeamResponse
} from './api.d';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://am.teamexithere.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to log request details
apiClient.interceptors.request.use(
    (config) => {
        console.log(
            `Request: ${config.method?.toUpperCase()} ${config.url}`,
            config.params,
            config.data
        );
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to log response details
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Response:', response.data);
        return response;
    },
    (error) => {
        console.log(
            'Response Error:',
            error.response ? error.response.data : error.message
        );
        return Promise.reject(error);
    }
);

const handleResponse = <T>(
    response: AxiosResponse<ApiResponseSuccess<T> | ApiResponseFail>
): T | null => {
    if (response.data.result === 'SUCCESS') {
        return response.data.data;
    } else {
        console.error(response.data.error.decs);
        return null;
    }
};

export const login = async (
    data: LoginRequest
): Promise<LoginResponse | null> => {
    const response = await apiClient.post<
        ApiResponseSuccess<LoginResponse> | ApiResponseFail
    >('/api/users', data);
    return handleResponse(response);
};

export const addTeam = async (
    data: AddTeamRequest
): Promise<AddTeamResponse[] | null> => {
    const response = await apiClient.post<
        ApiResponseSuccess<AddTeamResponse[]> | ApiResponseFail
    >('/api/team', data);
    return handleResponse(response);
};

export const deleteTeam = async (
    userId: string,
    teamId: number
): Promise<DeleteTeamResponse[] | null> => {
    const response = await apiClient.delete<
        ApiResponseSuccess<DeleteTeamResponse[]> | ApiResponseFail
    >(`/api/team/${userId}/${teamId}`);
    return handleResponse(response);
};

export const updateTeam = async (
    data: UpdateTeamRequest
): Promise<UpdateTeamResponse[] | null> => {
    const response = await apiClient.put<
        ApiResponseSuccess<UpdateTeamResponse[]> | ApiResponseFail
    >('/api/team', data);
    return handleResponse(response);
};

export const getTopicList = async (
    gameId: number
): Promise<TopicListResponse[] | null> => {
    const response = await apiClient.get<
        ApiResponseSuccess<TopicListResponse[]> | ApiResponseFail
    >(`/api/topic/${gameId}`);
    return handleResponse(response);
};

export const startGame = async (
    topicId: number,
    level: string
): Promise<StartGameResponse[] | null> => {
    const response = await apiClient.get<
        ApiResponseSuccess<StartGameResponse[]> | ApiResponseFail
    >(`/api/topic`, { params: { topicId, level } });
    return handleResponse(response);
};

export const endGame = async (
    data: EndGameRequest
): Promise<EndGameResponse[] | null> => {
    const response = await apiClient.post<
        ApiResponseSuccess<EndGameResponse[]> | ApiResponseFail
    >('/api/rank', data);
    return handleResponse(response);
};

export const getRank = async (
    userId: string
): Promise<RankResponse[] | null> => {
    const response = await apiClient.get<
        ApiResponseSuccess<RankResponse[]> | ApiResponseFail
    >(`/api/rank/${userId}`);
    return handleResponse(response);
};

export const resetRank = async (userId: string): Promise<void> => {
    await apiClient.delete(`/api/rank/${userId}`);
};
export { RankResponse };
