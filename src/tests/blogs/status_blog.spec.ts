import request from 'supertest';

import app from '../../app';
import { transErrors } from '../../lang/en';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('GET /api/v1/blogs/status/:id', () => {
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

    it('Can change status blog', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/status/${blogId}`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        const blog: any = await BlogService.detailBlog(blogId, {});
        expect(blog.status).toBe(true);
    });

    it('Cannot change status blog without token', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/status/${blogId}`);
        expect(result.status).toBe(401);
    });

    it('Cannot change status blog with wrong blog id', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/status/${blogId}123`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.system.object_id_invalid);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot change status blog with wrong blog id not found', async () => {
        const result: any = await request(app)
            .get(`/api/v1/blogs/status/5e9c48cf181e950bc8c3eead`)
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.blog.not_found);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});
