import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
import { transErrors, transValidation, transSuccess } from '../../lang/en';
connectDB();

describe('POST /api/v1/login', () => {
    beforeEach(async () => {
        await DatabaseService.refreshDatabaseForTesting();
        await AuthService.register({
            name: 'Quan Nguyen',
            username: 'username_test',
            password: 'password_test',
            password_confirmation: 'password_test',
        });
    });

    it('Can sign in', async () => {
        const result: any = await request(app).post('/api/v1/login').send({
            username: 'username_test',
            password: 'password_test',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.auth.login_success('username_test'));
        expect(typeof data).toBe('string');
        expect(status).toBe(true);
    });

    it('Cannot sign in without request body', async () => {
        const result: any = await request(app).post('/api/v1/login').send({
            username: '',
            password: '',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toEqual({
            username: transValidation.auth.username_incorrect,
            password: transValidation.auth.password_incorrect,
        });
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot sign in with wrong username', async () => {
        const result: any = await request(app).post('/api/v1/login').send({
            username: 'username',
            password: 'password_test',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.auth.login_failed);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot sign in with wrong password', async () => {
        const result: any = await request(app).post('/api/v1/login').send({
            username: 'username_test',
            password: 'password',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.auth.login_failed);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});
