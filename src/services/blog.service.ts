import { Blog } from '../models/blog.model';
import { checkObjectId } from '../helpers/string.helper';

export class BlogService {
    constructor() {}

    /**
     * This is function get all blog
     * @param resPerPage
     * @param options
     */
    static async paginate(resPerPage: number, options?: any): Promise<any> {
        let status = options.status || null;
        let selectField = options.select || null;
        let category = options.category || null;
        let page = Number(options.page) || 1;

        // Custom find object
        let query = <any>{};
        if (status) query.status = true;
        if (category) {
            checkObjectId(category);
            query.categoryId = category;
        }
        return await Blog.paginate(resPerPage, query, page, selectField);
    }

    /**
     * This is function count blog
     * @param options
     */
    static async count(options?: any): Promise<any> {
        let category = options.category || null;
        let status = options.status || null;
        let query = <any>{};
        if (category) {
            checkObjectId(category);
            query.categoryId = category;
        }
        if (status) query.status = status;
        return await Blog.count(query);
    }

    /**
     * This is function create blog
     * @param data
     */
    static async create(data: object): Promise<any> {
        return await Blog.create(data);
    }

    /**
     * This is function remove blog
     * @param id
     */
    static async remove(id: string): Promise<any> {
        return await Blog.findOneAndRemove({ _id: id }).exec();
    }

    /**
     * This is function update blog
     * @param id
     * @param data
     */
    static async update(id: string, data: object): Promise<any> {
        return await Blog.findOneAndUpdate({ _id: id }, data).exec();
    }

    /**
     * This is function detail blog
     * @param id
     */
    static async detail(id: string): Promise<any> {
        return await Blog.findById(id).exec();
    }

    /**
     * This is function change status blog
     * @param id
     * @param status
     */
    static async status(id: string, status: boolean): Promise<any> {
        return await Blog.findOneAndUpdate(
            { _id: id },
            { $set: { status: !status } },
        ).exec();
    }
}
