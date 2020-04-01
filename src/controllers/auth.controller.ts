import { Request, Response } from 'express';

import { userFormat } from '../helpers/user.helper';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { transErrors, transSuccess } from '../lang/vi';
import { dataError, dataSuccess } from '../helpers/json.helper';
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
        if (!isValid) return res.send(dataError(errors || transErrors.system.server_error));

        // Login service
        try {
            const result = await AuthService.login(req.body);
            return res.send(dataSuccess(transSuccess.system.success, result));
        } catch (error) {
            return res.send(dataError(error.message || transErrors.system.server_error));
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
        if (!isValid) return res.send(dataError(errors || transErrors.system.server_error));

        // Create new user
        try {
            const result = await AuthService.register(req.body);
            return res.send(dataSuccess(transSuccess.system.success, result));
        } catch (error) {
            return res.send(dataError(error.message || transErrors.system.server_error));
        }
    }

    /**
     * Get user by token
     * @param req
     * @param res
     */
    static async auth(req: Request, res: Response): Promise<any> {
        try {
            const result = await userFormat(req.user);
            return res.send(dataSuccess(transSuccess.system.success, result));
        } catch (error) {
            return res.send(dataError(error.message || transErrors.system.server_error));
        }
    }

    /**
     * Change password user
     * @param req
     * @param res
     */
    static async changePassword(req: Request, res: Response): Promise<any> {
        // Check validation
        const { errors, isValid } = changePassword(req.body);
        if (!isValid) return res.send(dataError(errors || transErrors.system.server_error));

        // Init variable
        let user;

        // Get user by email
        try {
            const result: any = await userFormat(req.user);
            if (result) user = await UserService.findUserByEmail(result.email);
        } catch (error) {
            return res.send(dataError(error.message || transErrors.system.server_error));
        }

        // Update user password
        try {
            const resultUpdate = await AuthService.updatePassword(user.email, req.body);
            return res.send(dataSuccess(transSuccess.system.success, resultUpdate));
        } catch (error) {
            return res.send(dataError(error.message || transErrors.system.server_error));
        }
    }
}
