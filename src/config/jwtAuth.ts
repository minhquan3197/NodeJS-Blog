import jwt from 'jsonwebtoken';
import config from './constants';

export const sign = (obj: object) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            obj,
            config.key.secret,
            { expiresIn: '2 days' },
            (error, token) => {
                if (error) return reject(error);
                resolve(token);
            },
        );
    });
};
