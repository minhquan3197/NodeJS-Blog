import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { connectDB } from '../../config/connect_database';
import { transValidation, transSuccess } from '../../lang/en';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('POST /api/v1/register', () => {
    beforeEach(async () => {
        await DatabaseService.refreshDatabaseForTesting();
    });

    it('Can sign up', async () => {
        const result: any = await request(app).post('/api/v1/register').send({
            name: 'test',
            username: 'username_test',
            password: 'password_test',
            password_confirmation: 'password_test',
        });
        const result_guest: any = await request(app).post('/api/v1/register').send({
            name: 'test',
            username: 'username_test_2',
            password: 'password_test',
            password_confirmation: 'password_test',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.user.user_created('username_test'));
        expect(status).toBe(true);
        expect(data.is_admin).toBeTruthy();
        expect(data.username).toBe('username_test');
        expect(data.password).toBeUndefined();
        expect(result_guest.body.data.is_admin).not.toBeTruthy();
        const loginAfterRegister = await AuthService.login({
            username: 'username_test',
            password: 'password_test',
        });
        expect(typeof loginAfterRegister).toBe('string');
    });

    it('Cannot sign up without request body', async () => {
        const result: any = await request(app).post('/api/v1/register').send({
            name: '',
            username: '',
            password: '',
            password_confirmation: '',
        });
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toEqual({
            name: transValidation.auth.name_incorrect,
            username: transValidation.auth.username_incorrect,
            password: transValidation.auth.password_incorrect,
            password_confirmation: transValidation.auth.password_confirmation_incorrect,
        });
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot sign up with password_confirmation incorrect', async () => {
        const result: any = await request(app).post('/api/v1/register').send({
            name: 'test',
            username: 'username_test',
            password: 'password_test',
            password_confirmation: 'password_test_2',
        });
        const { status, result_code, message, data } = result.body;
        expect(message).toEqual({
            password_confirmation: transValidation.auth.password_confirmation_incorrect,
        });
        expect(result_code).toBe(400);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});
