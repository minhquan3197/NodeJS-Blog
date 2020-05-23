import { hash, compare } from 'bcryptjs';

import Models from '../models';
import { sign } from '../config/jwt';
import BaseService from './BaseService';
import config from '../config/constants';
import { transErrors } from '../lang/en';
import BusinessError from '../middlewares/errors/business';
import { Login, Register, ChangePassword } from '../interfaces/User';

class AuthService extends BaseService {
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
     * @param payload
     */
    async login(payload: Login): Promise<any> {
        const { username, password } = payload;

        // Compare password
        const user = await this.userModel.findOne({ username });
        if (!user) return new BusinessError(transErrors.auth.loginFailed, 400);
        const isMatch = await compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) return new BusinessError(transErrors.auth.loginFailed, 400);

        // Encode token
        const data = {
            id: user.id,
            name: user.name,
            username: user.username,
        };
        const token = await sign(data);
        return token;
    }

    /**
     * This is function register
     * @param payload
     */
    async register(payload: Register): Promise<any> {
        // Init variable
        const { username, password, name } = payload;
        // Get user
        const user = await this.userModel.findOne({ username });
        if (user) return new BusinessError(transErrors.auth.accountInUse, 400);

        // Generate password
        const hashPassword = await hash(password, config.key.hashPasswordLength);

        const objectUser: any = {
            username,
            password: hashPassword,
            name,
        };
        // Create user object
        const newUser = await this.userModel.create(objectUser);

        // Save user database
        return newUser;
    }

    /**
     * Update user password
     * @param userId
     * @param payload
     */
    async updatePassword(userId: string, payload: ChangePassword): Promise<any> {
        // Init variable
        const { oldPassword, password } = payload;

        // Get user
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) return new BusinessError(transErrors.user.notFound, 404);
        const isMatch = compare(oldPassword, user.password);
        if (!isMatch) return new BusinessError(transErrors.auth.userCurrentPasswordFailed, 400);

        // Generate password
        const hashPassword = await hash(password, config.key.hashPasswordLength);

        // Update password
        const updatedPassword = await user.updateOne({ password: hashPassword });
        return updatedPassword;
    }
}
export default AuthService.getInstance;
