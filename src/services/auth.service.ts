import { hash, compare } from 'bcryptjs';

import { sign } from '../config/jwtAuth';
import { User, IUser } from '../models/user.model';
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
        const { email, password } = data;

        // Get user
        const user = await UserService.findUserByEmail(email);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await this.comparePassword(user.password, password);
        if (!isMatch) throw new MyError(transErrors.auth.login_failed);

        // Encode token
        const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
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
        const { email, password } = data;

        // Get user
        const user = await UserService.findUserByEmail(email);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Generate password
        const hashPassword = await hash(password, 8);

        // Create user object
        let newUser = new User({ email, password: hashPassword });

        // Check if no one user exists system, isAdmin is true
        const checkExistsdatabase = await UserService.checkUserExists();
        if (!checkExistsdatabase) newUser.isAdmin = true;

        // Save user database
        await user.save();

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
    static async updatePassword(email: string, data: IChangePassword): Promise<any> {
        // Init variable
        const { old_password, password } = data;

        // Get user
        const user = await UserService.findUserByEmail(email);
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
