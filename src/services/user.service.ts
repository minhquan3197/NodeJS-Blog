import { User } from '../models/user.model';
import { MyError } from '../helpers/error.helper';
import { transErrors } from '../lang/vi';

export class UserService {
    constructor() {}

    /**
     * This is function check user exists in database
     */
    static async checkUserExists(): Promise<boolean> {
        const count = await User.countDocuments();
        if (count === undefined || count === null) throw new MyError();
        return !!count;
    }

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
     * This is function find user by email
     * @param email
     */
    static async findUserByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });
        if (!user) throw new MyError(transErrors.user.user_not_found, 404);
        return user;
    }
}
