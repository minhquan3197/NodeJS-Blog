import { User } from '../models/user.model';
import { MyError } from '../utils/error.util';
import { transErrors } from '../lang/vi';

export class UserService {
    constructor() {}

    /**
     * This is function find user by id
     * @param id
     */
    static async findUserById(id: string): Promise<any> {
        const user = await User.findById(id);
        if (!user) throw new MyError(transErrors.user.user_not_found, 404);
        return user;
    }

    /**
     * This is function find user by username
     * @param username
     */
    static async findUserByUsername(username: string): Promise<any> {
        const user = await User.findOne({ username });
        if (!user) throw new MyError(transErrors.user.user_not_found, 404);
        return user;
    }
}
