import { Response, Request } from 'express';

import { transErrors, transSuccess } from '../lang/en';
import { dataError, dataSuccess } from '../utils/json.util';
import { CategoryService } from '../services/category.service';
import { categoryInput } from '../validations/category.validation';

export class CategoryController {
    /**
     * This is function get list categories
     * @param req
     * @param res
     */
    static async index(req: Request, res: Response): Promise<any> {
        try {
            const result = await CategoryService.fetchCategories();
            return res.send(dataSuccess(result));
        } catch (error) {
            return res.send(dataError(error.message));
        }
    }

    /**
     * This is function get detail category
     * @param req
     * @param res
     */
    static async detail(req: Request, res: Response): Promise<any> {
        try {
            const result = await CategoryService.detailCategory(req.params._id);
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
        const { errors, isValid } = categoryInput(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            if (!user) res.send(dataError(transErrors.auth.permission_error));
            const result = await CategoryService.createCategory(req.body);
            return res.send(dataSuccess(result, transSuccess.category.category_created(result.name)));
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
        const { errors, isValid } = categoryInput(req.body);
        if (!isValid) return res.send(dataError(errors));

        try {
            if (!user || !user.is_admin) res.send(dataError(transErrors.auth.permission_error));
            const result = await CategoryService.updateCategory(req.params._id, req.body);
            return res.send(dataSuccess(result, transSuccess.category.category_updated(result.name)));
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
            const result = await CategoryService.removeBlog(req.params._id);
            return res.send(dataSuccess(result, transSuccess.category.category_deleted(result.name)));
        } catch (error) {
            return res.send(dataError(error.message, null));
        }
    }
}
