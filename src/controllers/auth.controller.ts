import { Request, Response } from 'express';

import { userFormat } from '../helpers/user.helper';
import { AuthService } from '../services/auth.service';
import { transErrors } from '../lang/vi';
import { dataError, dataSuccess } from '../helpers/json.helper';
import { changePassword } from '../validations/auth.validation';

export class AuthController {
    constructor() {}

    /**
     * This is function login
     * @param req
     * @param res
     */
    static async login(req: Request, res: Response): Promise<any> {
        try {
            const result = await AuthService.login(req.body);
            if (!result)
                return res.send(
                    dataError(transErrors.auth.login_failed, null, 400),
                );
            return res.send(dataSuccess('Ok', result, 200));
        } catch (error) {
            return res.send(
                dataError(error.message || 'Bad request', null, 400),
            );
        }
    }

    /**
     * This is function register
     * @param req
     * @param res
     */
    static async register(req: Request, res: Response): Promise<any> {
        try {
            const result = await AuthService.register(req.body);
            if (!result)
                return res.send(
                    dataError(transErrors.auth.login_failed, null, 400),
                );
            return res.send(dataSuccess('Ok', result, 200));
        } catch (error) {
            return res.send(
                dataError(error.message || 'Bad request', null, 400),
            );
        }
    }

    /**
     * Get user by token
     * @param req
     * @param res
     */
    static async auth(req: Request, res: Response): Promise<any> {
        try {
            if (!req.user)
                return res.send(
                    dataError(transErrors.auth.login_failed, null, 400),
                );
            const result = await userFormat(req.user);
            if (!result)
                return res.send(
                    dataError(transErrors.auth.login_failed, null, 400),
                );
            return res.send(dataSuccess('Ok', result, 200));
        } catch (error) {
            return res.send(
                dataError(error.message || 'Bad request', null, 400),
            );
        }
    }
}
