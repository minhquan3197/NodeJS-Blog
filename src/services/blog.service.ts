import config from '../config/constants';
import { Blog } from '../models/blog.model';

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
        const status = options.status || null;
        const customFind = { status };

        // Custom select field
        const selectField = options.select || null;

        // Paginate
        const resultPaginate = await Blog.blogPaginate(paginate, customFind, selectField);

        // Total item
        const totalItem = await this.countBlogs();

        const result = {
            data: resultPaginate,
            current_page: page,
            total_page: Math.ceil(totalItem / limit),
            total_item: totalItem,
        };
        return result;
    }

    /**
     * This is function count blog
     */
    static async countBlogs(): Promise<any> {
        return await Blog.countDocuments();
    }
}
