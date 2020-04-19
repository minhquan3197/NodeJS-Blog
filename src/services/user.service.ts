import { User } from '../models/user.model';
import { MyError } from '../utils/error.util';
import { transErrors } from '../lang/en';

export class UserService {
    constructor() {}

    /**
     * This is function find user by id
     * @param id
     */
    static async findUserById(id: string): Promise<any> {
        const user = await User.findById(id);
        if (!user) return null;
        return user;
    }

    /**
     * This is function find user by username
     * @param username
     */
    static async findUserByUsername(username: string): Promise<any> {
        const user = await User.findOne({ username });
        if (!user) return null;
        return user;
    }

    /**
     * This is function check user exists in database
     */
    static async countUserExists(): Promise<any> {
        return await User.countDocuments();
    }

    /**
     * This is function push item to user
     * @param idUser
     * @param idItem
     */
    static async pushItemToUser(idUser: string, idItem: string): Promise<any> {
        return await User.pushBlogToUserBlogs(idUser, idItem);
    }

    /**
     * This is function push item to user
     * @param idUser
     * @param idItem
     */
    static async pullItemFromUser(idUser: string, idItem: string): Promise<any> {
        return await User.pullBlogFromUser(idUser, idItem);
    }
}
