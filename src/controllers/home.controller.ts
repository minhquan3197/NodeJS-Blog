import { Response, Request } from 'express';

import { HomeService } from '../services/home.service';
import { dataError, dataSuccess } from '../utils/json.util';

export class HomeController {
    /**
     * This is function test api
     * @param req 
     * @param res 
     */
    static async index(req: Request, res: Response): Promise<any> {
        try {
            const result = await HomeService.getHello();
            return res.send(dataSuccess('Ok', result));
        } catch (error) {
            return res.send(dataError(error.message || 'Bad request', null));
        }
    }
}
