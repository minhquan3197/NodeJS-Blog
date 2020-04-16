import { app } from '../../index';
import request from 'supertest';

describe('POST /api/v1/login', () => {
    it('Should have some hello, world', async () => {
        const result: any = await request(app).post('/api/v1/login').send({
            username: 'test',
            password: 'test',
        });
        console.log(result.body);
    });
});
