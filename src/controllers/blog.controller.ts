import { Response, Request } from 'express';

import { transErrors } from '../lang/vi';
import { BlogService } from '../services/blog.service';
import { blogInput } from '../validations/blog.validation';
import { dataError, dataSuccess } from '../utils/json.util';

export class BlogController {
    /**
     * This is function get list blogs
     * @param req
     * @param res
     */
    static async index(req: Request, res: Response): Promise<any> {
        const options: any = req.query;
        const user: any = req.user || null;
        try {
            // If user is auth and have role is admin
            if (!user) {
                options.select = 'name image created_at';
                options.status = true;
            }
            const result = await BlogService.fetchBlogs(options);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * This is function get detail blog
     * @param req
     * @param res
     */
    static async detail(req: Request, res: Response): Promise<any> {
        const options: any = req.query;
        const user: any = req.user || null;
        try {
            // If user is not have auth and not have role is admin
            if (!user) options.status = true;
            const result = await BlogService.detailBlog(req.params._id, options);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * This is function create blog
     * @param req
     * @param res
     */
    static async create(req: Request, res: Response): Promise<any> {
        const user: any = req.user || null;
        // Check validation
        const { errors, isValid } = blogInput(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            if (!user) res.send(dataError(transErrors.auth.permission_error));
            const result = await BlogService.createBlog(req.body);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * This is function update blog
     * @param req
     * @param res
     */
    static async update(req: Request, res: Response): Promise<any> {
        const user: any = req.user || null;

        // Check validation
        const { errors, isValid } = blogInput(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            if (!user || !user.is_admin) res.send(dataError(transErrors.auth.permission_error));
            const result = await BlogService.updateBlog(req.params._id, req.body);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message, null));
        }
    }

    /**
     * This is function remove blog
     * @param req
     * @param res
     */
    static async remove(req: Request, res: Response): Promise<any> {
        const user: any = req.user || null;
        try {
            if (!user || !user.is_admin) res.send(dataError(transErrors.auth.permission_error));
            const result = await BlogService.removeBlog(req.params._id);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message, null));
        }
    }

    /**
     * This is function change status blog
     * @param req
     * @param res
     */
    static async status(req: Request, res: Response): Promise<any> {
        const user: any = req.user || null;
        try {
            if (!user || !user.is_admin) res.send(dataError(transErrors.auth.permission_error));
            const result = await BlogService.changeStatusBlog(req.params._id);
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message, null));
        }
    }
}
