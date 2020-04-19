import express from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { BlogController } from '../controllers/blog.controller';

let router = express.Router();

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
    router.get('/blogs', passport.authenticate('jwt', { session: false }), BlogController.index);
    router.post('/blogs', passport.authenticate('jwt', { session: false }), BlogController.create);
    router.get('/blogs/:_id', passport.authenticate('jwt', { session: false }), BlogController.detail);
    router.put('/blogs/:_id', passport.authenticate('jwt', { session: false }), BlogController.update);
    router.delete('/blogs/:_id', passport.authenticate('jwt', { session: false }), BlogController.remove);

    // User
    router.get('/auth', passport.authenticate('jwt', { session: false }), AuthController.auth);
    router.post('/change_password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);

    // Public api fetch blog
    router.get('/node', BlogController.index);
    router.get('/node/:id', BlogController.detail);

    return app.use('/api/v1', router);
};
