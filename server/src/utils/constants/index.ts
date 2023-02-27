import { CookieOptions } from 'express';
import { L } from '../types';

export const LANGS: L[] = ['ro', 'ru'];

export const TokenExpirationTime = {
    ACCESS_TOKEN: 30 * 60 * 1000,
    REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000,
};

export const accessTokenOptions: CookieOptions = {
    httpOnly: true,
    maxAge: TokenExpirationTime.ACCESS_TOKEN,
};

export const refreshTokenOptions: CookieOptions = {
    httpOnly: true,
    maxAge: TokenExpirationTime.REFRESH_TOKEN,
};
