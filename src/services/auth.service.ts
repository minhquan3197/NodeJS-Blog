import { transErrors } from '../lang/vi';
import { User } from '../models/user.model';
import { sign } from '../helpers/jwt.helper';
import { UserService } from './user.service';
import { hash } from '../helpers/auth.helper';
import { MyError } from '../utils/error.util';
import { IAuthLogin, IAuthRegister, IChangePassword } from '../interfaces/auth.interface';

export class AuthService {
    constructor() {}

    /**
     * This is function login
     * @param data
     */
    static async login(data: IAuthLogin): Promise<any> {
        const { username, password } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await User.comparePassword(password);
        if (!isMatch) throw new MyError(transErrors.auth.login_failed);

        // Encode token
        const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            username: user.username,
        };
        const token = await sign(payload);
        return token;
    }

    /**
     * This is function register
     * @param data
     */
    static async register(data: IAuthRegister): Promise<any> {
        // Init variable
        const { username, password } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (user) throw new MyError(transErrors.auth.account_in_use);

        // Generate password
        const hashPassword = await hash(password);

        let item: any = {
            username,
            password: hashPassword,
        };

        // Check if not have user in database
        const check = await UserService.countUserExists();
        if (!check) item.is_admin = true;

        // Create user object
        let newUser = new User(item);

        // Save user database
        await newUser.save();

        // Return when complete reigster
        const userInfo = user.toObject();
        delete userInfo.password;
        return userInfo;
    }

    /**
     * Update user password
     * @param id
     * @param password
     */
    static async updatePassword(data: IChangePassword): Promise<any> {
        // Init variable
        const { old_password, password, username } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await User.comparePassword(old_password);
        if (!isMatch) throw new MyError(transErrors.auth.login_failed);

        // Generate password
        const hashPassword = await hash(password);

        // Update password
        const updatedPassword = await User.changePassword(user.id, hashPassword);
        return updatedPassword;
    }
}
