import jwt from 'jsonwebtoken';
import config from '../config/constants';

/**
 * This is function sign jwt
 * @param obj
 */
export const sign = (obj: object) => {
    return new Promise((resolve: any, reject: any) => {
        jwt.sign(obj, config.key.secret, { expiresIn: '2 days' }, (error: any, token: any) => {
            if (error) return reject(error);
            resolve(token);
        });
    });
};

/**
 * This is function verify token
 * @param token
 */
export const verify = async (token: string | any) => {
    return new Promise((resolve: any, reject: any) => {
        jwt.verify(token, config.key.secret, (error: any, obj: any) => {
            if (error) return reject(error);
            delete obj.exp;
            delete obj.iat;
            resolve(obj);
        });
    });
};
