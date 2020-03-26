import { Response, Request } from 'express';

import { UserService } from '../services/user.service';
import { dataError, dataSuccess } from '../helpers/json.helper';

export class UserController {
    /**
     * This is function check user exists system
     * @param req 
     * @param res 
     */
    static async checkUserExists(req: Request, res: Response) {
        try {
            const result = await UserService.checkUserExists();
            return res.send(dataSuccess('Ok', result));
        } catch (error) {
            return res.send(dataError(error.message || 'Bad request', null));
        }
    }
}
