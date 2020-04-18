import bcryptjs from 'bcryptjs';
import config from '../config/constants';

/**
 * This is function hash password
 * @param password
 */
export const hash = async (password: string): Promise<string> => {
    return await bcryptjs.hash(password, config.key.hash_password_length);
};

/**
 * This is function verify password
 * @param inputPassword
 * @param userPassword
 */
export const compare = async (inputPassword: string, userPassword: string): Promise<boolean> => {
    return !!(await bcryptjs.compare(inputPassword, userPassword));
};
