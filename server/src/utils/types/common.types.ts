export type BasePagination = {
    limit: number;
    page: number;
    totalPages: number;
};

export type L = 'ro' | 'ru';

export type PaginationQuery = Omit<BasePagination, 'totalPages'>;

export type BrowserData = {
    fingerprint: string;
    userAgent: string;
    ip: string;
};
