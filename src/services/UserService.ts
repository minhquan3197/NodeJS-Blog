import { hash, compare } from 'bcryptjs';

import Models from '../models';
import BaseService from './BaseService';
import config from '../config/constants';
import { transErrors } from '../lang/en';
import { ChangePassword } from '../interfaces/User';
import BusinessError from '../middlewares/errors/business';

class UserService extends BaseService {
    private static instance: UserService;

    private userModel: typeof Models.UserModel;

    constructor() {
        super();
        this.userModel = Models.UserModel;
    }

    public static get getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
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
export default UserService.getInstance;
