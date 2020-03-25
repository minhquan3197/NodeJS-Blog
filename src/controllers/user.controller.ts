import { Response, Request } from 'express';

import { UserService } from '../services/user.service';
import { dataError, dataSuccess } from '../config/responseCustom';

export class UserController {
    /**
     * This is function check user exists system
     */
    static checkUserExists = async (req: Request, res: Response) => {
        try {
            const userService = new UserService();
            const result = await userService.checkUserExists();
            return res.send(dataSuccess('Ok', result));
        } catch (error) {
            return res.send(dataError(error.message || 'Bad request', null));
        }
    };
}
