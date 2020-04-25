import request from 'supertest';

import app from '../../app';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { transErrors, transSuccess } from '../../lang/en';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
connectDB();

describe('GET /api/v1/caegories/:id', () => {
    let token: string;
    let blogId: string;
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
            name: 'test category',
        });
        const blog = await BlogService.createBlog({
            name: 'test',
            content: 'test_content',
            image: 'test_image',
            category_id: category.id,
        });
        token = 'Bearer ' + user;
        blogId = blog.id;
    });

    it('Can get detail blog', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/${blogId}`).set('Authorization', token);
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.system.success);
        expect(status).toBe(true);
        expect(data.name).toBe('test');
        expect(data.content).toBe('test_content');
        expect(data.image).toBe('test_image');
        expect(data.category_id.name).toBe('test category');
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
