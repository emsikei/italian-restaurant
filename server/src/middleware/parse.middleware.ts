import { Request, Response, NextFunction } from 'express';

export default function parseMiddleware(field: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const value = JSON.parse((req.body as any)[field]);
            (req.body as any)[field] = value;

            next();
        } catch (error) {
            next(error);
        }
    };
}
