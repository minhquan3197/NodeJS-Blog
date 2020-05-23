import express from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/AuthController';
import { HomeController } from '../controllers/HomeController';
import { BlogController } from '../controllers/PostController';

const router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
export const initRoutes = (app: express.Application) => {
    // Home
    router.get('/', HomeController.index);

    // Auth
    router.post('/login', AuthController.login);
    router.post('/register', AuthController.register);
    
    // User
    router.get('/auth', [passport.authenticate('jwt', { session: false })], AuthController.auth);

    return app.use('/api/v1', router);
};
