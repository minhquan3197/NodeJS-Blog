import express from 'express';
import { login } from '../controllers/auth.controller';
import { index } from '../controllers/home.controller';
import { checkUserExists } from '../controllers/user.controller';
import {
    checkDefault,
    checkLoggedIn,
    checkLoggedOut,
} from '../middlewares/checkRoute.middleware';

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
export const initRoutes = (app: any) => {
    // Auth
    router.get('/', checkLoggedOut, index);

    return app.use('/', router);
};
