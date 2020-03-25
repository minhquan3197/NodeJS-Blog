import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { UserController } from '../controllers/user.controller';
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
    router.get('/', checkLoggedOut, HomeController.index);

    return app.use('/', router);
};
