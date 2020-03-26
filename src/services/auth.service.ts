import { User } from '../models/user.model';
import { IAuthLogin, IAuthRegister } from '../interfaces/auth.interface';
import { MyError } from '../helpers/error.helper';
import { hash, compare } from 'bcryptjs';
import { sign } from '../config/jwtAuth';
import { transErrors } from '../lang/vi';
import { UserService } from './user.service';

export class AuthService {
    constructor(private readonly usersService: UserService) {}

    /**
     * This is function login
     */
    login = async (data: IAuthLogin): Promise<any> => {
        const { email, password } = data;
        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new MyError(transErrors.auth.account_in_use, 400);
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new MyError(transErrors.auth.login_failed, 400);
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        const token = await sign(payload);
        return token;
    };

    /**
     * This is function register
     */
    register = async (data: IAuthRegister): Promise<any> => {
        const { email, password } = data;
        const findUser = await this.usersService.findUserByEmail(email);
        if (findUser) throw new MyError(transErrors.auth.account_in_use, 400);
        const hashPassword = await hash(password, 8);
        const user = new User({ email, password: hashPassword });
        await user.save();
        const userInfo = user.toObject();
        delete userInfo.password;
        return userInfo;
    };
}
