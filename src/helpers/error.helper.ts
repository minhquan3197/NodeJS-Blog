import { transErrors } from '../lang/vi';

export class MyError extends Error {
    statusCode: number;
    constructor(
        message: string = transErrors.system.server_error,
        statusCode: number = 400,
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}
