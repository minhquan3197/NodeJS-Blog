import { hash, compare } from 'bcryptjs';

import { sign } from '../config/jwtAuth';
import { User } from '../models/user.model';
import { MyError } from '../helpers/error.helper';
import { transErrors } from '../lang/vi';
import { UserService } from './user.service';
import { IAuthLogin, IAuthRegister, IChangePassword } from '../interfaces/auth.interface';

export class AuthService {
    constructor() {}

    /**
     * This is function login
     * @param data
     */
    static async login(data: IAuthLogin): Promise<any> {
        // Init variable
        const { username, password } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await this.comparePassword(user.password, password);
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
        const hashPassword = await hash(password, 8);

        // Create user object
        let newUser = new User({ username, password: hashPassword });

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
    static async updatePassword(username: string, data: IChangePassword): Promise<any> {
        // Init variable
        const { old_password, password } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await this.comparePassword(user.password, old_password);
        if (!isMatch) throw new MyError(transErrors.auth.login_failed);

        // Generate password
        const hashPassword = await hash(password, 8);

        // Update password
        return await User.findOneAndUpdate({ _id: user.id }, { password: hashPassword }).exec();
    }

    /**
     * This is function compare password
     * @param user_password
     * @param password
     */
    static async comparePassword(user_password: string, password: string): Promise<boolean> {
        const isMatch = await compare(password, user_password);
        return !!isMatch;
    }
}
