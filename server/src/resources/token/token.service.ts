/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import UserDto from '@/dtos/user.dto';
import { BrowserData } from '@/utils/types/common.types';
import TokenModel from '@/resources/token/token.model';
import HttpException from '@/utils/exceptions/http.exception';
import { TokenExpirationTime } from '@/utils/constants';

export interface IJwtTokenService {
    generateAccessToken(payload: UserDto): string;
    validateAccessToken(token: string): UserDto | null;
    createRefreshToken(userId: string, browserData: BrowserData): Promise<string>;
    addRefreshToken(userId: string, browserData: BrowserData): Promise<string>;
    refreshTokenSession(
        browserData: BrowserData,
        refreshToken: string
    ): Promise<{ refreshToken: string; userId: string }>;
    removeRefreshToken(refreshToken: string, fingerprint: string): Promise<{ refreshToken: string }>;
}

export class JwtTokenService implements IJwtTokenService {
    private _tokenModel = TokenModel;

    public generateAccessToken = (payload: UserDto): string => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: TokenExpirationTime.ACCESS_TOKEN,
        });

        return accessToken;
    };

    public validateAccessToken = (token: string): UserDto | null => {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as UserDto;
            return userData;
        } catch (error) {
            return null;
        }
    };

    public createRefreshToken = async (userId: string, browserData: BrowserData): Promise<string> => {
        const refreshToken: string = uuidv4();

        const newSession = await this._tokenModel.create({
            userId,
            refreshToken,
            ua: browserData.userAgent,
            fingerprint: browserData.fingerprint,
            ip: browserData.ip,
            expiresAt: new Date(Date.now() + TokenExpirationTime.REFRESH_TOKEN), // 7 days
        });

        return newSession.refreshToken;
    };

    public addRefreshToken = async (userId: string, browserData: BrowserData): Promise<string> => {
        const refreshToken: string = uuidv4();

        const sessions = await this._tokenModel.find({ userId });

        if (sessions.length === 5) {
            await this._tokenModel.deleteMany({ userId }); // if logged in from 5 devices - logout
        }

        // login in on new device
        const newSession = await this._tokenModel.create({
            userId,
            refreshToken,
            ua: browserData.userAgent,
            fingerprint: browserData.fingerprint,
            ip: browserData.ip,
            expiresAt: new Date(Date.now() + TokenExpirationTime.REFRESH_TOKEN), // 7 days
        });

        return newSession.refreshToken;
    };

    public refreshTokenSession = async (
        browserData: BrowserData,
        refreshToken: string
    ): Promise<{ refreshToken: string; userId: string }> => {
        const session = await this._tokenModel.findOne({ refreshToken });

        if (!session) throw new HttpException(404, 'REFRESH_SESSION_NOT_FOUND');

        if (session.expiresAt < new Date()) {
            throw HttpException.BadRequest('TOKEN_EXPIRED');
        } else if (session.fingerprint !== browserData.fingerprint) {
            throw HttpException.BadRequest('INVALID_REFRESH_SESSION');
        }

        await this._tokenModel.findOneAndDelete({ refreshToken });

        const newRefreshToken = uuidv4();

        const newSession = await this._tokenModel.create({
            userId: session.userId,
            refreshToken: newRefreshToken,
            ua: session.ua,
            fingerprint: session.fingerprint,
            ip: session.ip,
            expiresAt: new Date(Date.now() + TokenExpirationTime.REFRESH_TOKEN),
        });

        return { refreshToken: newSession.refreshToken, userId: newSession.userId };
    };

    public removeRefreshToken = async (
        refreshToken: string,
        fingerprint: string
    ): Promise<{ refreshToken: string }> => {
        const session = await this._tokenModel.findOne({ refreshToken });

        if (!session) throw new HttpException(404, 'REFRESH_SESSION_NOT_FOUND');

        if (session.expiresAt < new Date()) {
            throw HttpException.BadRequest('TOKEN_EXPIRED');
        } else if (session.fingerprint !== fingerprint) {
            throw HttpException.BadRequest('INVALID_REFRESH_SESSION');
        }

        const removedToken = await this._tokenModel.findOneAndDelete({ refreshToken });

        if (!removedToken) throw new HttpException(404, 'REFRESH_SESSION_NOT_FOUND');

        return { refreshToken: removedToken.refreshToken };
    };
}
