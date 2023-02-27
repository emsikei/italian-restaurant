import axios, { AxiosResponse } from 'axios';

export type QueryResponse<T> = [error: string | null, data: T | null];

export const refreshTokens = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, undefined, { withCredentials: true });
};

export const getError = (error: any) => {
    if (error.isAxiosError && error.response) return error.response.data;
    return 'Unexpected error';
};

const handleRequest = async (request: () => Promise<AxiosResponse>): Promise<AxiosResponse> => {
    try {
        return await request();
    } catch (error: any) {
        if (error?.response?.status === 401) {
            try {
                await refreshTokens();
                return await request();
            } catch (innerError) {
                throw getError(innerError);
            }
        }

        throw getError(error);
    }
};

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
    try {
        const request = () => axios.get(url, { withCredentials: true });
        const { data } = await handleRequest(request);
        return [null, data];
    } catch (error: any) {
        return [error, null];
    }
};

export const poster = async <T>(url: string, payload?: unknown): Promise<QueryResponse<T>> => {
    try {
        const request = () => axios.post(url, payload, { withCredentials: true });
        const { data } = await handleRequest(request);
        return [null, data];
    } catch (error: any) {
        return [error, null];
    }
};

export const putter = async <T>(url: string, payload?: unknown): Promise<QueryResponse<T>> => {
    try {
        const request = () => axios.put(url, payload, { withCredentials: true });
        const { data } = await handleRequest(request);
        return [null, data];
    } catch (error: any) {
        return [error, null];
    }
};

export const deleter = async <T>(url: string): Promise<QueryResponse<T>> => {
    try {
        const request = () => axios.delete(url, { withCredentials: true });
        const { data } = await handleRequest(request);
        return [null, data];
    } catch (error: any) {
        return [error, null];
    }
};
