import config from '../config/constants';
import { User } from '../models/user.model';
import { Blog } from '../models/blog.model';
import Category from '../models/category.model';
import { ENVIRONMENT_TYPE } from '../utils/enum.util';
export class DatabaseService {
    constructor() {}

    /**
     * This is function remove all database
     */
    static async refreshDatabaseForTesting(): Promise<any> {
        if (config.env_server.type !== ENVIRONMENT_TYPE.TEST) return false;
        await Blog.deleteMany({});
        await User.deleteMany({});
        await Category.deleteMany({});
    }
}
