import request from 'supertest';

import app from '../../app';
import { transValidation, transSuccess } from '../../lang/en';
import { connectDB } from '../../config/connect_database';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('POST /api/v1/categories', () => {
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
        token = 'Bearer ' + user;
    });

    it('Can create category', async () => {
        const result: any = await request(app)
            .post('/api/v1/categories')
            .send({
                name: 'test',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(data.name).toBe('test');
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.category.category_created('test'));
        expect(status).toBe(true);
    });

    it('Cannot create category without request body', async () => {
        const result: any = await request(app)
            .post('/api/v1/categories')
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

    it('Cannot create category without token', async () => {
        const result: any = await request(app).post('/api/v1/categories').send({
            name: 'test',
        });
        expect(result.status).toBe(401);
    });
});
