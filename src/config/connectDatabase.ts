import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from './constants';

// Database environment
const DB_CONNECTION = config.env_database.connection;
const DB_USERNAME = config.env_database.username;
const DB_PASSWORD = config.env_database.password;
const DB_HOST = config.env_database.host;
const DB_NAME = config.env_database.name;
const DB_PORT = config.env_database.port;

// Connection string
const URL = `${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const connectDB = () => {
    mongoose.Promise = bluebird;
    mongoose
        .connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => console.log('Database connected'))
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });
};
