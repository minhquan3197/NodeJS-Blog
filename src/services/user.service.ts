import { User } from '../models/user.model';

export class UserService {
    constructor() {}

    /**
     * This is function check user exists in database
     */
    static async checkUserExists(): Promise<boolean> {
        const count = await User.countDocuments();
        return !!count;
    }

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
     * This is function find user by email
     * @param email
     */
    static async findUserByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });
        if (!user) return null;
        return user;
    }
}
