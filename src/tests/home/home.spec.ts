import app from '../../app';
import request from 'supertest';

describe('GET /api/v1/', () => {
    it('Should have some hello, world', async () => {
        const result: any = await request(app).get('/api/v1/');
        const { status, result_code, message, data } = result.body;
        expect(result_code).toBe(200);
        expect(message).toBe('Ok');
        expect(data).toBe('Hello, world');
        expect(status).toBe(true);
    });
});
