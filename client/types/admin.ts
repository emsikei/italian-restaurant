import { ReactNode } from 'react';

export type SidebarOption = {
    name: string;
    slug: string;
    icon: ReactNode;
};

export type QueryAdminData<T> = {
    data: T;
    limit: number;
    page: number;
    totalPages: number;
};
