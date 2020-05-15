import { transErrors } from '../lang/en';
import { sign } from '../config/jwt';
import { hash } from 'bcryptjs';
import BaseService from './BaseService';
import Models from '../models';

export class AuthService extends BaseService {
    private static instance: AuthService;

    private userModel: typeof Models.UserModel;

    constructor() {
        super();
        this.userModel = Models.UserModel;
    }

    public static get getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    /**
     * This is function login
     * @param data
     */
    public async login(payload: IAuthLoginInput): Promise<any> {
        const { username, password } = data;

        // Get user
        const user = await UserService.findUserByUsername(username);
        if (!user) throw new MyError(transErrors.auth.login_failed);
        // Compare password
        const isMatch = await User.comparePassword(password, user.password);
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
    static async register(data: IAuthRegisterInput): Promise<any> {
        // Init variable
        const { username, password, name } = data;
        // Get user
        const user = await UserService.findUserByUsername(username);
        if (user) throw new MyError(transErrors.auth.account_in_use);

        // Generate password
        const hashPassword = await hash(password);

        const item: any = {
            username,
            password: hashPassword,
            name,
        };

        // Check if not have user in database
        const check = await UserService.countUserExists();
        if (!check) item.is_admin = true;

        // Create user object
        const newUser = new User(item);

        // Save user database
        return await newUser.save();
    }

    /**
     * Update user password
     * @param id
     * @param password
     */
    static async updatePassword(user_id: string, data: IChangePasswordInput): Promise<any> {
        // Init variable
        const { old_password, password } = data;

        // Get user
        const user = await UserService.findUserById(user_id);
        if (!user) throw new MyError(transErrors.user.user_not_found);

        // Compare password
        const isMatch = await User.comparePassword(old_password, user.password);
        if (!isMatch) throw new MyError(transErrors.auth.user_current_password_failed);

        // Generate password
        const hashPassword = await hash(password);

        // Update password
        const updatedPassword = await User.changePassword(user.id, hashPassword);
        return updatedPassword;
    }
}
