import Models from '../models';
import BaseService from './BaseService';
import config from '../config/constants';
import { EnvironmentType } from '../utils/enums';

export class DatabaseService extends BaseService {
    private static instance: DatabaseService;

    private userModel: typeof Models.UserModel;

    constructor() {
        super();
        this.userModel = Models.UserModel;
    }

    public static get getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    /**
     * This is function remove all database
     */
    async refreshDatabaseForTesting(): Promise<any> {
        if (config.envServer.type !== EnvironmentType.TEST) return false;
        await this.userModel.deleteMany({});
    }
}
