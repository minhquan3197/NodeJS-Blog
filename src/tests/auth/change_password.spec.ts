import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
import { transValidation, transErrors, transSuccess } from '../../lang/en';
connectDB();

describe('POST /api/v1/change_password', () => {
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

    it('Can change password with token', async () => {
        const result: any = await request(app)
            .post('/api/v1/change_password')
            .send({
                old_password: 'password_test',
                password: 'password_test_2',
                password_confirmation: 'password_test_2',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.user.user_password_updated);
        expect(status).toBe(true);
        expect(data.username).toBe('username_test');
        expect(data.password).toBeUndefined();
        const loginWithNewPassword = await AuthService.login({
            username: 'username_test',
            password: 'password_test_2',
        });
        expect(typeof loginWithNewPassword).toBe('string');
    });

    it('Cannot change password user without token', async () => {
        const result: any = await request(app).post('/api/v1/change_password');
        expect(result.status).toBe(401);
    });

    it('Cannot change password without old_password', async () => {
        const result: any = await request(app)
            .post('/api/v1/change_password')
            .send({
                old_password: '',
                password: '',
                password_confirmation: '',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toEqual({
            old_password: transValidation.auth.old_password_incorrect,
            password: transValidation.auth.password_incorrect,
            password_confirmation: transValidation.auth.password_confirmation_incorrect,
        });
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot change password with old_password incorrect', async () => {
        const result: any = await request(app)
            .post('/api/v1/change_password')
            .send({
                old_password: 'password_test_2',
                password: 'password_test_2',
                password_confirmation: 'password_test_2',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(message).toBe(transErrors.auth.user_current_password_failed);
        expect(result_code).toBe(400);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot change password with password_confirmation incorrect', async () => {
        const result: any = await request(app)
            .post('/api/v1/change_password')
            .send({
                old_password: 'password_test',
                password: 'password_test_2',
                password_confirmation: 'password_test_3',
            })
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(message).toEqual({
            password_confirmation: transValidation.auth.password_confirmation_incorrect,
        });
        expect(result_code).toBe(400);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});
