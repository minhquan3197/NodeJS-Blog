import { Request, Response, NextFunction } from 'express';

export const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export const checkLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export const checkDefault = (req: Request, res: Response, next: NextFunction) => {
    next();
};
