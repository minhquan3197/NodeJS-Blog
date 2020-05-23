// Library
import * as dotenv from 'dotenv';

// Dotenv
dotenv.config();
export default {
    envServer: {
        host: process.env.APP_HOST || 'localhost',
        port: Number(process.env.APP_PORT).valueOf() || 3000,
        type: process.env.NODE_ENV || 'local',
    },
    envDatabase: {
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        local: 'mongodb://localhost/blog' || '',
        test: 'mongodb://localhost/blog-test' || '',
        docker: 'mongodb://mongo:27017/blog' || '',
        production:
            `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds211829.mlab.com:11829/blog` || '',
    },
    key: {
        secret: process.env.SECRET_OR_KEY || 'test',
        hashPasswordLength: 8,
    },
    paginate: {
        defaultLimit: 9,
        defaultPage: 1,
    },
};
