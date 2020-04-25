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
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT).valueOf() || 0,
        connection: process.env.DB_CONNECTION || 'mongodb',
        name: process.env.DB_NAME || '',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        local: 'mongodb://localhost/blog',
        test: 'mongodb://localhost/blog-test',
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
