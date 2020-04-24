import express from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/auth.controller';
import { HomeController } from '../controllers/home.controller';
import { BlogController } from '../controllers/blog.controller';
import { CategoryController } from '../controllers/category.controller';

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
    router.get('/blogs/status/:_id', passport.authenticate('jwt', { session: false }), BlogController.status);
    router.put('/blogs/:_id', passport.authenticate('jwt', { session: false }), BlogController.update);
    router.delete('/blogs/:_id', passport.authenticate('jwt', { session: false }), BlogController.remove);

    // Category
    router.get('/categories', CategoryController.index);
    router.post('/categories', passport.authenticate('jwt', { session: false }), CategoryController.create);
    router.get('/categories/:_id', passport.authenticate('jwt', { session: false }), CategoryController.detail);
    router.put('/categories/:_id', passport.authenticate('jwt', { session: false }), CategoryController.update);
    router.delete('/categories/:_id', passport.authenticate('jwt', { session: false }), CategoryController.remove);

    // User
    router.get('/auth', passport.authenticate('jwt', { session: false }), AuthController.auth);
    router.post('/change_password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);

    // Public api fetch blog
    router.get('/node', BlogController.index);
    router.get('/node/:_id', BlogController.detail);

    return app.use('/api/v1', router);
};
