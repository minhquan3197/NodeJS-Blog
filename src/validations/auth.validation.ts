import validator from 'validator';

import { IAuthLoginInput, IAuthRegisterInput, IChangePasswordInput } from '../interfaces/auth.interface';
import { isEmpty } from '../utils/function.util';
import { transValidation } from '../lang/en';

export const login = (dataLogin: IAuthLoginInput) => {
    let errors = <any>{};

    let { username, password } = dataLogin;

    username = !isEmpty(username) ? username : '';
    password = !isEmpty(password) ? password : '';

    if (validator.isEmpty(username)) {
        errors.username = transValidation.auth.username_incorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.password_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const register = (dataRegister: IAuthRegisterInput) => {
    let errors = <any>{};

    let { name, username, password, password_confirmation } = dataRegister;

    name = !isEmpty(name) ? name : '';
    username = !isEmpty(username) ? username : '';
    password = !isEmpty(password) ? password : '';
    password_confirmation = !isEmpty(password_confirmation) ? password_confirmation : '';

    if (validator.isEmpty(username)) {
        errors.username = transValidation.auth.username_incorrect;
    }
    if (validator.isEmpty(name)) {
        errors.name = transValidation.auth.name_incorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (validator.isEmpty(password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }
    if (!validator.equals(password, password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const changePassword = (dataChangePassword: IChangePasswordInput) => {
    let errors = <any>{};

    let { old_password, password_confirmation, password } = dataChangePassword;

    old_password = !isEmpty(old_password) ? old_password : '';
    password = !isEmpty(password) ? password : '';
    password_confirmation = !isEmpty(password_confirmation) ? password_confirmation : '';

    if (validator.isEmpty(old_password)) {
        errors.old_password = transValidation.auth.old_password_incorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (validator.isEmpty(password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }
    if (!validator.equals(password, password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
