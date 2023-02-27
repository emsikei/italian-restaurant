export type UserDocument = {
    id: string;
    email: string;
    name: string;
    roles: string[];
};

export type AuthLogin = {
    email: string;
    password: string;
};
