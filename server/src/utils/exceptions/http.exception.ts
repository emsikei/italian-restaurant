class HttpException extends Error {
    public status: number;

    public message: string;

    public data: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static NotFound(message: string = ''): HttpException {
        return message ? new HttpException(404, message) : new HttpException(404, 'RESOURCE_NOT_FOUND');
    }

    static UnathorizedError(message: string = ''): HttpException {
        return message ? new HttpException(401, message) : new HttpException(401, 'UNAUTHORIZED_USER');
    }

    static PermissionsError(): HttpException {
        return new HttpException(403, 'INSUFFICIENT_PERMISSIONS');
    }

    static BadRequest(message: string = ''): HttpException {
        return message ? new HttpException(400, message) : new HttpException(400, 'INTERNAL_SERVER_ERROR');
    }

    static ValidationError(errors: any): HttpException {
        return new HttpException(422, 'VALIDATION_ERROR', errors);
    }
}

export default HttpException;
