import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { UserController } from '../controllers/user.controller';
import {
    checkDefault,
    checkLoggedIn,
    checkLoggedOut,
} from '../middlewares/route.middleware';

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
export const initRoutes = (app: any) => {
    // Home
    router.get('/', checkLoggedOut, HomeController.index);

    // Auth
    router.post('/login', checkLoggedOut, AuthController.login);
    router.post('/register', checkDefault, AuthController.register);

    return app.use('/api/v1', router);
};
