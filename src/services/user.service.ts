import { User } from '../models/user.model';
import { MyError } from '../helpers/error.helper';
import { transErrors } from '../lang/vi';

export class UserService {
    constructor() {}

    /**
     * This is function check user exists in database
     */
    checkUserExists = async (): Promise<boolean> => {
        const count = await User.countDocuments();
        return !!count;
    };

    /**
     * This is function find user by id
     */
    findUserById = async (id: string): Promise<any> => {
        const user = await User.findById(id);
        if (!user) return null;
        return user;
    };

    /**
     * This is function find user by email
     */
    findUserByEmail = async (email: string): Promise<any> => {
        const user = await User.findOne({ email });
        if (!user) return null;
        return user;
    };
}
