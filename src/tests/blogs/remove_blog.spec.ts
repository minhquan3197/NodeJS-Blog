import request from 'supertest';

import app from '../../app';
import { transErrors } from '../../lang/en';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
connectDB();

describe('DELETE /api/v1/blogs/:id', () => {
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

    it('Can remove blog', async () => {
        const result: any = await request(app).delete(`/api/v1/blogs/${blogId}`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(status).toBe(true);
        const blog: any = await request(app).get(`/api/v1/blogs/${blogId}`).set('Authorization', token);
        expect(blog.body.message).toBe(transErrors.blog.not_found);
    });

    it('Cannot remove blog without token', async () => {
        const result: any = await request(app).delete(`/api/v1/blogs/${blogId}`);
        expect(result.status).toBe(401);
    });

    it('Cannot remove blog with wrong blog id', async () => {
        const result: any = await request(app).delete(`/api/v1/blogs/${blogId}123`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.system.object_id_invalid);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });

    it('Cannot remove blog with wrong blog id not found', async () => {
        const result: any = await request(app)
            .delete(`/api/v1/blogs/5e9c48cf181e950bc8c3eead`)
            .set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(400);
        expect(message).toBe(transErrors.blog.not_found);
        expect(data).toBeNull();
        expect(status).toBe(false);
    });
});