import { Request, Response, NextFunction } from 'express';

import { JwtTokenService } from '@/resources/token/token.service';
import HttpException from '@/utils/exceptions/http.exception';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return next(HttpException.UnathorizedError('NO_ACCESS_TOKEN'));
        }

        const userData = new JwtTokenService().validateAccessToken(token);
        if (!userData) {
            return next(HttpException.UnathorizedError('EXPIRED_ACCESS_TOKEN'));
        }

        (req as any).user = userData;
        next();
    } catch (error) {
        return next(HttpException.UnathorizedError());
    }
}
