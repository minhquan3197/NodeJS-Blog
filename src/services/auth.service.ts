import { User } from '../models/user.model';
export class AuthService {
    constructor() {}

    /**
     * This is function login
     */
    login = async (): Promise<boolean> => {
        const count = await User.countUser();
        return true;
    };
}
