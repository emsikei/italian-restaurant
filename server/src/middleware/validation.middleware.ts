import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import HttpException from '@/utils/exceptions/http.exception';

type Error = {
    [key: string]: string;
};

export default function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [] as Error[];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return next(HttpException.ValidationError(extractedErrors));
}
