import express from 'express';

import AuthController from '../controllers/AuthController';
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

    // User
    router.get('/auth', authentication, AuthController.auth);
    router.post('/password', authentication, AuthController.changePassword);

    return app.use('/api/v1', router);
};
