import { Controller, Get, Route, Tags } from 'tsoa';
import { dataError, dataSuccess } from '../config/responseCustom';
import { UserService } from '../services/user.service';

@Route('/')
@Tags('User')
export class UserController extends Controller {
    @Get('check')
    public async checkUserExists() {
        try {
            const userService = new UserService();
            const result = await userService.checkUserExists();
            return dataSuccess('Ok', result);
        } catch (error) {
            return dataError(error.message || 'Bad request', null);
        }
    }
}
