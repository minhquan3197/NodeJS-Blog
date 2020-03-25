import { Request, Response } from 'express';
import { dataError, dataSuccess } from '../config/responseCustom';

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        return res.send(dataSuccess('Ok', 'Hello, World', 201));
    } catch (error) {
        return res.send(dataError(error.message || 'Bad request', null, 400));
    }
};
