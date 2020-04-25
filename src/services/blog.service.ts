import { transErrors } from '../lang/en';
import config from '../config/constants';
import { Blog } from '../models/blog.model';
import { MyError } from '../utils/error.util';
import { CategoryService } from './category.service';
import { checkObjectId } from '../utils/function.util';

export class BlogService {
    constructor() {}

    /**
     * This is function fetch blog with paginate
     * @param options
     */
    static async fetchBlogs(options: any): Promise<any> {
        // Paginate object
        const limit = !isNaN(Number(options.limit).valueOf())
            ? Number(options.limit).valueOf()
            : config.paginate.default_limit;
        const page = !isNaN(Number(options.page).valueOf())
            ? Number(options.page).valueOf()
            : config.paginate.default_page;
        const paginate = { limit, page };

        // Query search
        const categoryId = options.category ? options.category.trim() : null;
        const name = options.name ? options.name.trim() : null;
        const status = options.status ? options.status : null;
    
        // Custom field find
        let customFind: any = {};
        if (status) customFind.status = status;
        if (categoryId) customFind.category_id = categoryId;
        if (name) customFind.name = new RegExp('^' + name + '$', 'i');

        // Custom select field
        const selectField = options.select || null;

        // Paginate
        const resultPaginate = await Blog.blogPaginate(paginate, customFind, selectField);

        // Total item
        const totalItem = await this.countBlogs(customFind);

        const result = {
            data: resultPaginate,
            current_page: page,
            total_page: Math.ceil(totalItem / limit),
            total_item: totalItem,
        };
        return result;
    }

    /**
     * This is function create blog
     */
    static async createBlog(data: any): Promise<any> {
        const { name, content, image, category_id } = data;
        checkObjectId(category_id);
        const item = {
            name: name,
            content: content,
            image: image,
            category_id: category_id,
        };
        const blog = await Blog.create(item);
        await CategoryService.pushItem(category_id, blog._id);
        return blog;
    }

    /**
     * This is function update blog
     */
    static async updateBlog(blogId: string, item: any): Promise<any> {
        item.updated_at = Date.now();

        checkObjectId(blogId);
        const result = await Blog.findOneAndUpdate({ _id: blogId }, item).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        if (item.category_id && item.category_id !== result.category_id) {
            Promise.all([
                CategoryService.pullItem(result.category_id, result._id),
                CategoryService.pushItem(item.category_id, result._id),
            ]);
        }
        return result;
    }

    /**
     * This is function get detail blog
     */
    static async detailBlog(id: string, options: any): Promise<any> {
        const status = options.status || false;
        let query: any = {
            _id: id,
        };
        if (status) query.status = true;

        checkObjectId(id);
        const result = await Blog.findOne(query).populate('category_id', { name: 'name' }).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        return result;
    }

    /**
     * This is function remove blog
     */
    static async removeBlog(id: string): Promise<any> {
        checkObjectId(id);
        const result = await Blog.findOneAndRemove({ _id: id }).exec();
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        await CategoryService.pullItem(result.category_id, result._id);
        return result;
    }

    /**
     * This is function get detail blog
     */
    static async changeStatusBlog(id: string): Promise<any> {
        checkObjectId(id);
        const result = await Blog.changeStatus(id);
        if (!result) throw new MyError(transErrors.blog.not_found, 404);
        return result;
    }

    /**
     * This is function count blog
     */
    static async countBlogs(customFind: any): Promise<any> {
        // Custom field find
        return await Blog.countDocuments(customFind);
    }
}
