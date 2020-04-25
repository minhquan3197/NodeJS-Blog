import { Request, Response } from 'express';

import { userFormat } from '../utils/format.util';
import { AuthService } from '../services/auth.service';
import { transErrors, transSuccess } from '../lang/en';
import { dataError, dataSuccess } from '../utils/json.util';
import { changePassword, login, register } from '../validations/auth.validation';

export class AuthController {
    constructor() {}

    /**
     * This is function login
     * @param req
     * @param res
     */
    static async login(req: Request, res: Response): Promise<any> {
        // Check validation
        const { errors, isValid } = login(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            const result = await AuthService.login(req.body);
            return res.send(dataSuccess(result, transSuccess.auth.login_success(req.body.username)));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * This is function register
     * @param req
     * @param res
     */
    static async register(req: Request, res: Response): Promise<any> {
        // Check validation
        const { errors, isValid } = register(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            const user = await AuthService.register(req.body);
            const result = userFormat(user);
            return res.send(dataSuccess(result, transSuccess.user.user_created(result.username)));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * Get user by token
     * @param req
     * @param res
     */
    static auth(req: Request, res: Response): any {
        try {
            const result = userFormat(req.user);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * Change password user
     * @param req
     * @param res
     */
    static async changePassword(req: Request, res: Response): Promise<any> {
        const user: any = req.user || null;
        // Check validation
        const { errors, isValid } = changePassword(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            if (!user) res.send(dataError(transErrors.auth.permission_error));
            const result = await AuthService.updatePassword(user.id, req.body);
            return res.send(dataSuccess(userFormat(result), transSuccess.user.user_password_updated));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }
}
