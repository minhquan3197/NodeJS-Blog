import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from './constants';
import { ENVIRONMENT_TYPE } from '../utils/enum.util';

/**
 * This is function get Uri database
 */
export const getDatabaseUri = (): string => {
    const { docker, production, local, test } = config.env_database;
    const NODE_ENV = config.env_server.type;
    switch (NODE_ENV) {
        case ENVIRONMENT_TYPE.PROD:
            return production;
        case ENVIRONMENT_TYPE.TEST:
            return test;
        case ENVIRONMENT_TYPE.DEV:
            return docker;
        default:
            return local;
    }
};

export const connectDB = () => {
    mongoose.Promise = bluebird;
    mongoose
        .connect(getDatabaseUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {})
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });
};
