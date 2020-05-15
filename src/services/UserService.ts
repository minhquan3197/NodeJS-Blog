import { User } from '../models/UserModel';

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
}
