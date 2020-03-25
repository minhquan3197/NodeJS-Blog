import { dataError, dataSuccess } from '../config/responseCustom';
import { UserService } from '../services/user.service';

export const checkUserExists = async (): Promise<any> => {
    try {
        const userService = new UserService();
        const result = await userService.checkUserExists();
        return dataSuccess('Ok', result);
    } catch (error) {
        return dataError(error.message || 'Bad request', null);
    }
};
