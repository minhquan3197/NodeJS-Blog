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

    // Blog
    router.get('/blogs', [passport.authenticate('jwt', { session: false })], BlogController.index);
    router.post('/blogs', [passport.authenticate('jwt', { session: false })], BlogController.create);
    router.get('/blogs/:_id', [passport.authenticate('jwt', { session: false })], BlogController.detail);
    router.get('/blogs/status/:_id', [passport.authenticate('jwt', { session: false })], BlogController.status);
    router.put('/blogs/:_id', [passport.authenticate('jwt', { session: false })], BlogController.update);
    router.delete('/blogs/:_id', [passport.authenticate('jwt', { session: false })], BlogController.remove);

    // User
    router.get('/auth', [passport.authenticate('jwt', { session: false })], AuthController.auth);

    return app.use('/api/v1', router);
};
