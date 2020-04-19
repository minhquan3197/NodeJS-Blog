import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
import { transErrors } from '../../lang/en';
connectDB();

describe('GET /api/v1/blogs/:id', () => {
    let token: any;
    let blogId: any;
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
        const blog = await BlogService.createBlog(newUser._id, {
            name: 'test',
            content: 'test_content',
            image: 'test_image',
        });
        token = 'Bearer ' + user;
        blogId = blog.id;
    });

    it('Can get detail blog', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/${blogId}`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        expect(data.name).toBe('test');
        expect(data.content).toBe('test_content');
        expect(data.image).toBe('test_image');
    });

    it('Can get detail blog without token by auth', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/${blogId}`);
        expect(result.status).toBe(401);
    });

    it('Can get detail blog without token by guest', async () => {
        const result: any = await request(app).get(`/api/v1/node/${blogId}`);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.blog.not_found);
        expect(status).toBe(false);
        expect(data).toBeNull();
    });
});
