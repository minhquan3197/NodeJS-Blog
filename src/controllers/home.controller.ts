import { Response, Request } from 'express';

import { dataError, dataSuccess } from '../config/responseCustom';
import { HomeService } from '../services/home.service';

export const index = async (req: Request, res: Response): Promise<any> => {
    try {
        const homeService = new HomeService();
        const result = await homeService.getHello();
        return res.send(dataSuccess('Ok', result));
    } catch (error) {
        return res.send(dataError(error.message || 'Bad request', null));
    }
};
