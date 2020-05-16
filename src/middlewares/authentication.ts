import { Request, Response, NextFunction } from 'express';

import InternalError from './errors/internal';
import { verify } from '../config/jwt';

class Authentication {
    private static instance: Authentication;

    /* eslint-disable */
    private constructor() {}

    public static get getInstance(): Authentication {
        if (!Authentication.instance) {
            Authentication.instance = new Authentication();
        }
        return Authentication.instance;
    }

    public JwtChecker(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        let jwtPayload: string | object;

        try {
            jwtPayload = verify(token);
            res.locals.jwtPayload = jwtPayload;
            console.log(jwtPayload);
            return next();
        } catch (error) {
            return next(new InternalError(error));
        }
    }
}

export default Authentication.getInstance;
