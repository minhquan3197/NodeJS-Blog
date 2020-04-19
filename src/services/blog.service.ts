import { transErrors } from '../lang/en';
import config from '../config/constants';
import { Blog } from '../models/blog.model';
import { UserService } from './user.service';
import { MyError } from '../utils/error.util';
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

        // Custom field find
        let customFind: any = {};
        const status = options.status || null;
        if (status) customFind.status = status;

        // Custom select field
        const selectField = options.select || null;

        // Paginate
        const resultPaginate = await Blog.blogPaginate(paginate, customFind, selectField);

        // Total item
        const totalItem = await this.countBlogs(options);

        const result = {
            data: resultPaginate,
            current_page: page,
            total_page: Math.ceil(totalItem / limit),
            total_item: totalItem,
        };
        return result;
    }

    /**
     * This is function remove blog
     */
    static async createBlog(userId: string, data: any): Promise<any> {
        checkObjectId(userId);
        const { name, content, image } = data;
        const item = {
            name: name,
            content: content,
            image: image,
            created_by: userId,
        };
        const blog = await Blog.create(item);
        await UserService.pushItemToUser(userId, blog._id);
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
        const result = await Blog.findOne(query)
            .populate('created_by', { name: 'name', username: 'username', avatar: 'avatar' })
            .exec();
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
    static async countBlogs(options: any): Promise<any> {
        // Custom field find
        let customCount: any = {};
        const status = options.status || null;
        if (status) customCount.status = status;
        return await Blog.countDocuments(customCount);
    }
}
