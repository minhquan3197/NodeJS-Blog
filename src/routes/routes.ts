import express from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { UserController } from '../controllers/user.controller';

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
export const initRoutes = (app: any) => {
    // Home
    router.get('/', HomeController.index);

    // Auth
    router.post('/login', AuthController.login);
    router.post('/register', AuthController.register);

    // User
    router.get('/auth', passport.authenticate('jwt', { session: false }), AuthController.auth);
    router.get('/change_password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);

    return app.use('/api/v1', router);
};
