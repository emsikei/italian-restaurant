import { Request, Response, NextFunction, Router } from 'express';

import IController from '@/utils/interfaces/controller.interface';
import AuthService from '@/resources/auth/auth.service';
import { UserLogin, UserRegistration, ChangePassword } from '@/utils/types';
import {
    userLoginValidationRules,
    userRegisterValidationRules,
    userChangePasswordValidationRules,
    userResetPasswordEmailValidationRules,
    userResetPasswordValidationRules,
} from '@/utils/validators/auth.validator';
import validationMiddleware from '@/middleware/validation.middleware';
import authMiddleware from '@/middleware/auth.middleware';
import { accessTokenOptions, refreshTokenOptions } from '@/utils/constants';
import Logger from '../logger/logger.service';

class AuthController implements IController {
    public path: string = '/auth';

    public router: Router = Router();

    private _authService = new AuthService();

    private _logger = Logger.getInstance();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}/login`, userLoginValidationRules(), validationMiddleware, this.login);
        this.router.post(`${this.path}/register`, userRegisterValidationRules(), validationMiddleware, this.register);
        this.router.post(`${this.path}/refresh`, this.refreshTokens);

        this.router.post(`${this.path}/logout`, authMiddleware, this.logout);

        this.router.put(
            `${this.path}/password-change`,
            authMiddleware,
            userChangePasswordValidationRules(),
            validationMiddleware,
            this.changePassword
        );

        this.router.post(
            `${this.path}/password-reset/email-send`,
            userResetPasswordEmailValidationRules(),
            validationMiddleware,
            this.sendEmailForPasswordReset
        );

        this.router.get(`${this.path}/password-reset/:token`, this.processTokenForPasswordReset);

        this.router.put(
            `${this.path}/password-reset`,
            userResetPasswordValidationRules(),
            validationMiddleware,
            this.resetPassword
        );
    }

    private register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body as UserRegistration;
            const fingerprint = req.fingerprint?.hash as string;
            const userAgent: string = req.headers['user-agent'] as string;
            const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;

            const userData = await this._authService.register(
                {
                    name,
                    email,
                    password,
                },
                { fingerprint, userAgent, ip }
            );

            res.cookie('accessToken', userData.accessToken, accessTokenOptions);
            res.cookie('refreshToken', userData.refreshToken, refreshTokenOptions);

            this._logger.log('Auth register!');

            return res.status(200).json({ message: 'User successfully registered!' });
        } catch (error) {
            next(error);
        }
    };

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body as UserLogin;
            const fingerprint = req.fingerprint?.hash as string;
            const userAgent = req.headers['user-agent'] as string;
            const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;

            const userData = await this._authService.login(
                {
                    email,
                    password,
                },
                { fingerprint, userAgent, ip }
            );

            res.cookie('accessToken', userData.accessToken, accessTokenOptions);
            res.cookie('refreshToken', userData.refreshToken, refreshTokenOptions);

            this._logger.log('Auth login!');

            return res.status(200).json({ message: 'User logged in!' });
        } catch (error) {
            next(error);
        }
    };

    private logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refreshToken;
            const fingerprint = req.fingerprint?.hash as string;

            const logoutResponse = await this._authService.logout(token, fingerprint);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            this._logger.log('Auth logout!');

            return res.status(200).json({ message: 'Logged out!' });
        } catch (error) {
            next(error);
        }
    };

    private refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fingerprint = req.fingerprint?.hash as string;
            const userAgent = req.headers['user-agent'] as string;
            const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
            // const token = req.cookies('refreshToken');
            const token = req.cookies.refreshToken;

            const authResponse = await this._authService.refreshTokens({ fingerprint, userAgent, ip }, token);

            res.cookie('accessToken', authResponse.accessToken, accessTokenOptions);
            res.cookie('refreshToken', authResponse.refreshToken, refreshTokenOptions);

            this._logger.log('Auth refresh tokens!');

            return res.status(200).json({ message: 'Tokens refreshed!' });
        } catch (error) {
            next(error);
        }
    };

    private sendEmailForPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body as { email: string };

            await this._authService.sendEmailForPasswordReset(email);

            this._logger.log('Auth send email for password reset!');

            return res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            next(error);
        }
    };

    private processTokenForPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.params;

            await this._authService.processTokenForPasswordReset(token);

            this._logger.log('Auth process token for password reset!');

            return res.redirect(`${process.env.CLIENT_URL}/auth/password-reset/${token}`);
        } catch (error) {
            // TODO: redirect to page with error about link
            next(error);
        }
    };

    private resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { newPassword, token } = req.body as {
                newPassword: string;
                token: string;
            };

            await this._authService.resetPassword(token, newPassword);

            this._logger.log('Auth reset password!');

            return res.status(200).json({ message: 'Password reseted successfully' });
        } catch (error) {
            // TODO: redirect to page with error about token
            next(error);
        }
    };

    private changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { oldPassword, newPassword, email } = req.body as ChangePassword;

            const response = await this._authService.changePassword({
                email,
                oldPassword,
                newPassword,
            });

            this._logger.log('Auth change password!');

            return res.status(200).json({ message: 'Password changed' });
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
