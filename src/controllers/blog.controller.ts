import { Response, Request } from 'express';

import { BlogService } from '../services/blog.service';
import { dataError, dataSuccess } from '../utils/json.util';

export class BlogController {
    /**
     * This is function test api
     * @param req
     * @param res
     */
    static async index(req: Request, res: Response): Promise<any> {
        const options: any = req.query;
        const user: any = req.user || null;
        try {
            // If user is auth and have role is admin
            if (user && user.is_admin) {
                options.select = 'name image created_at';
                options.status = true;
            }
            const result = await BlogService.fetchBlogs(options);
            return res.send(dataSuccess('Ok', result));
        } catch (error) {
            return res.send(dataError(error.message || 'Bad request', null));
        }
    }
}
