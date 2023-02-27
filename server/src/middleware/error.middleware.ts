import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(error: HttpException, req: Request, res: Response, _next: NextFunction): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errors = error.data || '';
    res.status(status).send({
        status,
        message,
        errors,
    });
}

export default errorMiddleware;
