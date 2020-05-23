import { Response, Request, NextFunction } from 'express';

import HomeService from '../services/HomeService';

class HomeController {
    private static instance: HomeController;

    public static get getInstance(): HomeController {
        if (!HomeController.instance) {
            HomeController.instance = new HomeController();
        }
        return HomeController.instance;
    }
    /**
     * This is function test api
     * @param req
     * @param res
     */
    public index(req: Request, res: Response, next: NextFunction): any {
        try {
            const result = HomeService.getHello();
            res.locals.data = result;
            next();
        } catch (error) {
            next(error);
        }
    }
}
export default HomeController.getInstance;
