import { UserLogin, UserRegistration } from '@/utils/types';
import { ChangePassword } from '@/utils/types/user.types';

export const mockChangePasswordValid: ChangePassword = {
    email: 'test_user@gmail.com',
    oldPassword: 'test_password',
    newPassword: 'password',
};

export const mockChangePasswordUserNotFound: ChangePassword = {
    email: 'test@gmail.com',
    oldPassword: 'test_password',
    newPassword: 'password',
};

export const mockChangePasswordInvalidOldPassword: ChangePassword = {
    email: 'test_user@gmail.com',
    oldPassword: 'test_password_invalid',
    newPassword: 'password',
};

export const mockChangePasswordTheSamePasswords: ChangePassword = {
    email: 'test_user@gmail.com',
    oldPassword: 'test_password',
    newPassword: 'test_password',
};

export const mockLoginUser: UserLogin = {
    email: 'test_user@gmail.com',
    password: 'test_password',
};

export const mockLoginAdmin: UserLogin = {
    email: 'admin@gmail.com',
    password: 'password',
};

export const mockLoginUserRememberMe: UserLogin = {
    email: 'test_user@gmail.com',
    password: 'test_password',
};

export const mockLoginNonExistingUser: UserLogin = {
    email: 'user@mail.com',
    password: 'test_password',
};

export const mockLoginInvalidEmailUser: UserLogin = {
    email: 'test_user',
    password: 'password',
};

export const mockLoginInvalidPasswordUser: UserLogin = {
    email: 'test_user@gmail.com',
    password: 'password',
};

export const mockRegisterUser: UserRegistration = {
    name: 'user',
    email: 'user@gmail.com',
    password: 'password',
};

export const mockNonValidEmailRegisterUser: UserRegistration = {
    name: 'user',
    email: 'user',
    password: 'password',
};

export const mockNonValidPasswordRegisterUser: UserRegistration = {
    name: 'user',
    email: 'test_user@gmail.com',
    password: 'passwor',
};
