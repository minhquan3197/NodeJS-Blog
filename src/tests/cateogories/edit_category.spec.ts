import request from 'supertest';

import app from '../../app';
import { connectDB } from '../../config/connect_database';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
import { transValidation, transErrors, transSuccess } from '../../lang/en';
connectDB();

describe('PUT /api/v1/categories/:id', () => {
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

    it('Can update category', async () => {
        const result: any = await request(app)
            .put(`/api/v1/categories/${categoryId}`)
            .send({
                name: 'test_2',
            })
            .set('Authorization', token);
        const { status, result_code, message } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.category.category_updated('test'));
        expect(status).toBe(true);
        const category: any = await CategoryService.detailCategory(categoryId);
        expect(category.name).toBe('test_2');
    });

    it('Cannot update category without request body', async () => {
        const result: any = await request(app)
            .put(`/api/v1/categories/${categoryId}`)
            .send({
                name: '',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toEqual({
            name: transValidation.category.name_incorrect,
        });
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot update category with wrong category id', async () => {
        const result: any = await request(app)
            .put(`/api/v1/categories/${categoryId}123`)
            .send({
                name: 'test_2',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.system.object_id_invalid);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot update category with wrong category id not found', async () => {
        const result: any = await request(app)
            .put(`/api/v1/categories/5e9c48cf181e950bc8c3eead`)
            .send({
                name: 'test_2',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.category.not_found);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot update category without token', async () => {
        const result: any = await request(app).put(`/api/v1/categories/${categoryId}`).send({
            name: 'test',
        });
        expect(result.status).toBe(401);
    });
});
