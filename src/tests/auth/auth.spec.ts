import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('GET /api/v1/auth', () => {
    let token: any;
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

    it('Can get user with token', async () => {
        const result: any = await request(app).get('/api/v1/auth').set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        expect(data.username).toBe('username_test');
        expect(data.password).toBeUndefined();
    });

    it('Cannot get user without token', async () => {
        const result: any = await request(app).get('/api/v1/auth');
        expect(result.status).toBe(401);
    });

    it('Cannot get user with wrong token', async () => {
        const result: any = await request(app)
            .get('/api/v1/auth')
            .set('Authorization', token + '123');
        expect(result.status).toBe(401);
    });
});
