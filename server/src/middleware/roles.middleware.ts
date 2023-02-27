import { Request, Response, NextFunction } from 'express';
import { Role } from '@/utils/types';
import HttpException from '@/utils/exceptions/http.exception';

export default function rolesMiddleware(roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const { user } = req as any;

        let hasRole: boolean = false;
        user.roles.forEach((role: Role) => {
            if (roles.includes(role)) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            next(HttpException.PermissionsError());
        }

        next();
    };
}
