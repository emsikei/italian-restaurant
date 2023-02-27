import IUser from '@/resources/user/user.interface';

export type UserRegistration = Omit<IUser, '_id' | 'roles' | 'token'>;

export type UserLogin = Omit<IUser, '_id' | 'roles' | 'name' | 'token'>;

export type ResetPasswordToken = {
    value: string;
    expiresIn: Date;
    isUsed?: boolean;
};

export type ChangePassword = {
    email: string;
    oldPassword: string;
    newPassword: string;
};

export type Role = 'ADMIN' | 'USER';
