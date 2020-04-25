import request from 'supertest';

import app from '../../app';
import { transSuccess } from '../../lang/en';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { connectDB } from '../../config/connect_database';
import { DatabaseService } from '../../services/database.service';
import { CategoryService } from '../../services/category.service';
connectDB();

describe('GET /api/v1/blogs', () => {
    let token: string;
    let categoryId: string;
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
        const category_2 = await CategoryService.createCategory({
            name: 'test category 2',
        });
        await BlogService.createBlog({
            name: 'test',
            content: 'test_content',
            image: 'test_image',
            category_id: category_2.id,
        });
        await BlogService.createBlog({
            name: 'test 2',
            content: 'test_content',
            image: 'test_image',
            category_id: category.id,
        });
        categoryId = category_2.id;
        token = 'Bearer ' + user;
    });

    it('Can get list blogs', async () => {
        const result: any = await request(app).get(`/api/v1/blogs/`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        const { data, total_page, total_item } = result.body.data;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.system.success);
        expect(status).toBe(true);
        expect(data.length).toBe(2);
        expect(total_page).toBe(1);
        expect(total_item).toBe(2);
    });

    it('Can get list blogs with by category', async () => {
        const result: any = await request(app).get(`/api/v1/blogs?category=${categoryId}`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        const { data, total_page, total_item } = result.body.data;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.system.success);
        expect(status).toBe(true);
        expect(data.length).toBe(1);
        expect(total_page).toBe(1);
        expect(total_item).toBe(1);
    });

    it('Can get list blogs with by name', async () => {
        const result: any = await request(app).get(`/api/v1/blogs?name=test 2`).set('Authorization', token);
        const { status, result_code, message } = result.body;
        const { data, total_page, total_item } = result.body.data;
        expect(result_code).toBe(200);
        expect(message).toBe(transSuccess.system.success);
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
        expect(message).toBe(transSuccess.system.success);
        expect(status).toBe(true);
        expect(data.length).toBe(0);
        expect(total_page).toBe(0);
        expect(total_item).toBe(0);
    });
});
