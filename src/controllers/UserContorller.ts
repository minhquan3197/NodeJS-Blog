import { Request, Response, NextFunction } from 'express';

import { transErrors } from '../lang/en';
import UserService from '../services/UserService';
import BusinessError from '../middlewares/errors/business';
import { changePasswordValidate } from '../middlewares/validator/AuthValidator';

class UserController {
    private static instance: UserController;

    public static get getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
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
            const result = await UserService.updatePassword(user.id, req.body);
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
export default UserController.getInstance;
