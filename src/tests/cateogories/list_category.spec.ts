import request from 'supertest';

import app from '../../app';
import { transSuccess } from '../../lang/en';
import { AuthService } from '../../services/auth.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
connectDB();

describe('GET /api/v1/categories', () => {
    let token: string;
    beforeEach(async () => {
        await DatabaseService.refreshDatabaseForTesting();
        await AuthService.register({
            name: 'Quan Nguyen',
            username: 'username_test',
            password: 'password_test',
            password_confirmation: 'password_test',
        });
        const user = await AuthService.login({
            username: 'username_test',
            password: 'password_test',
        });
        await CategoryService.createCategory({
            name: 'test',
        });
        token = 'Bearer ' + user;
    });

    it('Can get list categories', async () => {
        const result: any = await request(app).get(`/api/v1/categories/`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.system.success);
        expect(status).toBe(true);
        expect(data.length).toBe(1);
    });
});
