import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('GET /api/v1/blogs', () => {
    let token: any;
    beforeEach(async () => {
        await DatabaseService.refreshDatabaseForTesting();
        const newUser = await AuthService.register({
            name: 'Quan Nguyen',
            username: 'username_test',
            password: 'password_test',
            password_confirmation: 'password_test',
        });
        const user = await AuthService.login({
            username: 'username_test',
            password: 'password_test',
        });
        await BlogService.createBlog(newUser._id, {
            name: 'test',
            content: 'test_content',
            image: 'test_image',
        });
        token = 'Bearer ' + user;
    });

    it('Can get list blogs', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        const { data, total_page, total_item } = result.body.data;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        expect(data.length).toBe(1);
        expect(total_page).toBe(1);
        expect(total_item).toBe(1);
    });

    it('Can get list blogs without token by auth', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/`);
        expect(result.status).toBe(401);
    });

    it('Can get list blogs without token by guest', async () => {
        const result: any = await request(app).get(`/api/v1/node/`);
        const { status, result_code, message } = result.body;
        const { data, total_page, total_item } = result.body.data;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        expect(data.length).toBe(0);
        expect(total_page).toBe(0);
        expect(total_item).toBe(0);
    });
});
