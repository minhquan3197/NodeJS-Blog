import express from 'express';

import AuthController from '../controllers/AuthController';
import UserContorller from '../controllers/UserContorller';
import HomeController from '../controllers/HomeController';
import authentication from '../middlewares/Authentication';

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
    router.get('/auth', authentication, AuthController.auth);

    // User
    router.post('/password', authentication, UserContorller.changePassword);

    return app.use('/api/v1', router);
};
