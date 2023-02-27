import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import IUser from '@/resources/user/user.interface';
import UserService from '@/resources/user/user.service';
import JwtTokenService from '@/resources/token/token.service';
import HttpException from '@/utils/exceptions/http.exception';
import { UserLogin, UserRegistration, ChangePassword, ResetPasswordToken } from '@/utils/types';
import UserDto from '@/dtos/user.dto';
import MailService from '../mail/mail.service';
import { BrowserData } from '@/utils/types/common.types';

type AuthResponse = {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
};

class AuthService {
    private _userService = new UserService();

    private _jwtTokenService = new JwtTokenService();

    private _mailService = new MailService();

    public register = async (user: UserRegistration, browserData: BrowserData): Promise<AuthResponse> => {
        const candidate = await this._userService.findByEmail(user.email);

        if (candidate) {
            throw HttpException.BadRequest(`User with this ${user.email} - already exists`);
        }

        const hashedPassword = await bcrypt.hash(user.password, 12);

        const newUser = await this._userService.create({
            ...user,
            password: hashedPassword,
        });

        const refreshToken = await this._jwtTokenService.createRefreshToken(newUser._id.toString(), browserData);

        const accessToken = await this._jwtTokenService.generateAccessToken({
            ...new UserDto(newUser),
        });

        return {
            user: { ...new UserDto(newUser) },
            accessToken,
            refreshToken,
        } as AuthResponse;
    };

    public login = async (credentials: UserLogin, browserData: BrowserData): Promise<AuthResponse> => {
        const user = await this._userService.findByEmail(credentials.email);

        if (!user) {
            throw HttpException.BadRequest('USER_NOT_FOUND');
        }

        const isPassEqual = await bcrypt.compare(credentials.password, user.password);

        if (!isPassEqual) {
            throw HttpException.BadRequest('INVALID_PASSWORD');
        }

        const refreshToken = await this._jwtTokenService.addRefreshToken(user._id.toString(), browserData);

        const accessToken: string = this._jwtTokenService.generateAccessToken({
            ...new UserDto(user),
        });

        return {
            user: { ...new UserDto(user) },
            accessToken,
            refreshToken,
        } as AuthResponse;
    };

    public logout = async (refreshToken: string, fingerprint: string): Promise<{ refreshToken: string }> => {
        const token = await this._jwtTokenService.removeRefreshToken(refreshToken, fingerprint);

        return {
            refreshToken: token.refreshToken,
        };
    };

    public refreshTokens = async (browserData: BrowserData, refreshToken: string): Promise<AuthResponse> => {
        try {
            const { refreshToken: newRefreshSession, userId } = await this._jwtTokenService.refreshTokenSession(
                browserData,
                refreshToken
            );

            if (!newRefreshSession) throw HttpException.NotFound('REFRESH_SESSION_NOT_FOUND');

            const user = await this._userService.findById(userId);

            if (!user) throw HttpException.NotFound('USER_NOT_FOUND');

            const accessToken: string = this._jwtTokenService.generateAccessToken({
                ...new UserDto(user),
            });

            return {
                user: { ...new UserDto(user) },
                accessToken,
                refreshToken: newRefreshSession,
            } as AuthResponse;
        } catch (error: any) {
            throw HttpException.BadRequest(error.message);
        }
    };

    public sendEmailForPasswordReset = async (email: string): Promise<void> => {
        const tokenValue = uuid.v4();
        const expiresIn = new Date();
        expiresIn.setMinutes(expiresIn.getMinutes() + 5);

        const token: ResetPasswordToken = {
            value: tokenValue,
            expiresIn,
            isUsed: false,
        };

        const user = await this._userService.addToken(email, token);

        if (!user) throw HttpException.NotFound('USER_NOT_FOUND');

        await this._mailService.sendPasswordResetLink(
            email,
            `${process.env.API_URL}/api/v1/auth/password-reset/${token.value}`
        );
    };

    public processTokenForPasswordReset = async (token: string): Promise<boolean> => {
        const user: IUser | null = await this._userService.findByToken(token);

        if (user?.token.value !== token) throw HttpException.BadRequest('NOT_VALID_TOKEN');

        if (user?.token.expiresIn < new Date()) throw HttpException.BadRequest('LINK_IS_EXPIRED');

        if (user?.token.isUsed) throw HttpException.BadRequest('LINK_HAS_BEEN_ALREADY_USED');

        return true;
    };

    public resetPassword = async (token: string, newPassword: string): Promise<void> => {
        const user = await this._userService.findByToken(token);

        if (user?.token.value !== token) throw HttpException.BadRequest('NOT_VALID_TOKEN');

        if (user?.token.expiresIn < new Date()) throw HttpException.BadRequest('LINK_IS_EXPIRED');

        const updatedToken: ResetPasswordToken = {
            value: '',
            expiresIn: new Date(),
            isUsed: true,
        };

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await this._userService.resetPassword(hashedPassword, token, updatedToken);
    };

    public changePassword = async (data: ChangePassword): Promise<IUser> => {
        const user = await this._userService.findByEmail(data.email);

        if (!user) throw HttpException.NotFound('USER_NOT_FOUND');

        const isOldPassEqual = await bcrypt.compare(data.oldPassword, user.password);

        if (!isOldPassEqual) throw HttpException.BadRequest('INVALID_PASSWORD');

        const isOldPassEqualToNew = await bcrypt.compare(data.newPassword, user.password);

        if (isOldPassEqualToNew) throw HttpException.BadRequest('NEW_PASSWORD_EQUALS_TO_OLD');

        const hashedNewPass = await bcrypt.hash(data.newPassword, 12);

        const updatedUser = await this._userService.updatePassword(data.email, hashedNewPass);

        if (!updatedUser) throw HttpException.NotFound('USER_NOT_FOUND');

        return updatedUser;
    };
}

export default AuthService;
