import request from 'supertest';

import app from '../../app';
import { connectDB } from '../../config/connect_database';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
connectDB();

describe('GET /api/v1/categories/:id', () => {
    let token: string;
    let categoryId: string;
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
        const category = await CategoryService.createCategory({
            name: 'test',
        });
        token = 'Bearer ' + user;
        categoryId = category.id;
    });

    it('Can get detail category', async () => {
        const result: any = await request(app).get(`/api/v1/categories/${categoryId}`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        expect(data.name).toBe('test');
    });

    it('Can get detail category without token by auth', async () => {
        const result: any = await request(app).get(`/api/v1/categories/${categoryId}`);
        expect(result.status).toBe(401);
    });
});
