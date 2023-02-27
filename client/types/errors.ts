export type RequestError = {
    errors?: Record<string, unknown>[];
    message?: string;
    status?: number;
};
