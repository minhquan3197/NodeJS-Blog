import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from './constants';
import Logger from './logger';
import { EnvironmentType } from '../utils/enums';
/**
 * This is function get Uri database
 */
export const getDatabaseUri = (): string => {
    const { docker, production, local, test } = config.envDatabase;
    const NODE_ENV = config.envServer.type;
    switch (NODE_ENV) {
        case EnvironmentType.PROD:
            return production;
        case EnvironmentType.TEST:
            return test;
        case EnvironmentType.DEV:
            return docker;
        default:
            return local;
    }
};

/**
 * This is function connection database
 */
export const connectDB = () => {
    mongoose.Promise = bluebird;
    mongoose
        .connect(getDatabaseUri(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            w: 'majority',
        })
        .then(() => {
            Logger.success(`Connected database ${getDatabaseUri()} completed`);
        })
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });
};
