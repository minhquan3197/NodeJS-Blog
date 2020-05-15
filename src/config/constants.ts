// Library
import * as dotenv from 'dotenv';

// Dotenv
dotenv.config();
export default {
    env_server: {
        host: process.env.APP_HOST || 'localhost',
        port: Number(process.env.APP_PORT).valueOf() || 3000,
        type: process.env.NODE_ENV || 'development',
    },
    env_database: {
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
        hash_password_length: 8,
    },
    paginate: {
        default_limit: 8,
        default_page: 1,
    },
};
