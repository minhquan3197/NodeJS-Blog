import { User } from '../models/user.model';

export class UserService {
    constructor() {}

    /**
     * This is function check user exists in database
     */
    checkUserExists = async (): Promise<boolean> => {
        const count = await User.countDocuments();
        // If have user return true
        return !!count;
    };
}
