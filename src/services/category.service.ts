import { transErrors } from '../lang/en';
import { MyError } from '../utils/error.util';
import { Category } from '../models/category.model';
import { checkObjectId } from '../utils/function.util';

export class CategoryService {
    constructor() {}

    /**
     * This is function fetch categories
     * @param options
     */
    static async fetchCategories(): Promise<any> {
        const result = await Category.find({});
        return result;
    }

    /**
     * This is function create category
     */
    static async createCategory(data: any): Promise<any> {
        const result = await Category.create(data);
        return result;
    }

    /**
     * This is function update category
     */
    static async updateCategory(categoryId: string, item: any): Promise<any> {
        item.updated_at = Date.now();
        const result = await Category.findOneAndUpdate({ _id: categoryId }, item).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        return result;
    }

    /**
     * This is function get detail category
     */
    static async detailCategory(id: string): Promise<any> {
        checkObjectId(id);
        const result = await Category.findOne({ _id: id }).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        return result;
    }

    /**
     * This is function remove blog
     */
    static async removeBlog(id: string): Promise<any> {
        checkObjectId(id);
        const result = await Category.findOneAndRemove({ _id: id }).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        return result;
    }

    /**
     * This is function push item by category
     * @param idCategory
     * @param idItem
     */
    static async pushItem(idCategory: string, idItem: string): Promise<any> {
        checkObjectId(idCategory);
        return await Category.pushByCategory(idCategory, idItem);
    }

    /**
     * This is function pull item by category
     * @param idCategory
     * @param idItem
     */
    static async pullItem(idCategory: string, idItem: string): Promise<any> {
        checkObjectId(idCategory);
        return await Category.pullByCategory(idCategory, idItem);
    }
}
