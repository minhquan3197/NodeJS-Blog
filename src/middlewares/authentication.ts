import { Request, Response, NextFunction } from 'express';

import { verify } from '../config/jwt';
import { transErrors } from '../lang/en';
import BusinessError from './errors/business';

export default async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) return next(new BusinessError(transErrors.auth.authenticationFailed, 401));
    const token = bearerToken.replace('Bearer ', '');
    try {
        const jwtPayload = await verify(token);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        return next(new BusinessError(transErrors.auth.permissionError, 403));
    }
};
