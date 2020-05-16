import { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import InternalError from './internal';
import BusinessError from './business';

enum ContainerTypes {
    body,
    query,
    headers,
    fields,
    params,
}

const ErrorHandler = (
    error: InternalError | ExpressJoiError | BusinessError,
    req: Request,
    res: Response,
    /* eslint-disable */
    next: NextFunction,
): void => {
    if (error instanceof InternalError) {
        res.status(500).send({
            data: null,
            errors: 'Internal Server Error',
            status: false,
        });
    } else if (error instanceof BusinessError) {
        res.status(error.code || 500).send({
            data: null,
            errors: error.message,
            status: false,
        });
    } else if ((error as any).type && (error as any).type in ContainerTypes) {
        const errorMsgs: string[] = (error as any).error.details.map((elm: any) => elm.message);

        res.status(403).send({
            data: null,
            errors: errorMsgs,
            status: false,
        });
    } else {
        res.status(500).send({
            data: null,
            errors: error,
            status: false,
        });
    }
};

export default ErrorHandler;
