import { Request, Response, NextFunction } from 'express';

import { transErrors } from '../lang/en';
import AuthService from '../services/AuthService';
import BusinessError from '../middlewares/errors/business';
import { loginValidate, registerValidate, changePasswordValidate } from '../middlewares/validator/AuthValidator';

class AuthController {
    private static instance: AuthController;

    public static get getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    /**
     * This is function login
     * @param req
     * @param res
     */
    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { errors, isValid } = loginValidate(req.body);
        if (!isValid) next(errors);

        try {
            const result = await AuthService.login(req.body);
            if (result instanceof BusinessError) {
                next(result);
            } else {
                res.locals.data = result;
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * This is function register
     * @param req
     * @param res
     */
    async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { errors, isValid } = registerValidate(req.body);
        if (!isValid) next(errors);

        try {
            const result = await AuthService.register(req.body);
            if (result instanceof BusinessError) {
                next(result);
            } else {
                res.locals.data = result;
                next();
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get user by token
     * @param req
     * @param res
     */
    auth(req: Request, res: Response, next: NextFunction): any {
        try {
            const result = res.locals.jwtPayload;
            res.locals.data = result;
            next();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Change password user
     * @param req
     * @param res
     */
    async changePassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        const user: any = res.locals.jwtPayload || null;
        // Check validation
        const { errors, isValid } = changePasswordValidate(req.body);
        if (!isValid) next(errors);

        try {
            if (!user) return new BusinessError(transErrors.auth.permissionError, 401);
            const result = await AuthService.updatePassword(user.id, req.body);
            if (result instanceof BusinessError) {
                next(result);
            } else {
                res.locals.data = result;
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}
export default AuthController.getInstance;
