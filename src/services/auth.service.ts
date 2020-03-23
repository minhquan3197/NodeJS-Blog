import { User } from '../models/user.model';
export class HomeService {
    constructor() {}

    /**
     * This is function get Hello World
     */
    checkUserExists = async (): Promise<boolean> => {
        const count = await User.countUser();
        console.log(count);
        return true;
    };
}
