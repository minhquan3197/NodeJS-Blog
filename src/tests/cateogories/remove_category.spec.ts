import request from 'supertest';

import app from '../../app';
import { connectDB } from '../../config/connect_database';
import { AuthService } from '../../services/auth.service';
import { transErrors, transSuccess } from '../../lang/en';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
connectDB();

describe('DELETE /api/v1/categories/:id', () => {
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

    it('Can remove category', async () => {
        const result: any = await request(app).delete(`/api/v1/categories/${categoryId}`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.category.category_deleted('test'));
        expect(status).toBe(true);
        const category: any = await request(app).get(`/api/v1/categories/${categoryId}`).set('Authorization', token);
        expect(category.body.message).toBe(transErrors.category.not_found);
    });

    it('Cannot remove category without token', async () => {
        const result: any = await request(app).delete(`/api/v1/categories/${categoryId}`);
        expect(result.status).toBe(401);
    });

    it('Cannot remove category with wrong category id', async () => {
        const result: any = await request(app)
            .delete(`/api/v1/categories/${categoryId}123`)
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.system.object_id_invalid);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot remove category with wrong category id not found', async () => {
        const result: any = await request(app)
            .delete(`/api/v1/categories/5e9c48cf181e950bc8c3eead`)
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.category.not_found);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});
