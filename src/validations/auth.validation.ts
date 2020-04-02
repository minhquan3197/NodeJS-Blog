import validator from 'validator';

import { IAuthLogin, IAuthRegister, IChangePassword } from '../interfaces/auth.interface';
import { isEmpty } from '../helpers/string.helper';
import { transValidation } from '../lang/vi';

export const login = (dataLogin: IAuthLogin) => {
    let errors = <any>{};

    dataLogin.username = !isEmpty(dataLogin.username) ? dataLogin.username : '';
    dataLogin.password = !isEmpty(dataLogin.password) ? dataLogin.password : '';

    if (validator.isEmpty(dataLogin.username)) {
        errors.username = transValidation.auth.username_incorrect;
    }
    if (validator.isEmpty(dataLogin.password)) {
        errors.password = transValidation.auth.password_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const register = (dataRegister: IAuthRegister) => {
    let errors = <any>{};

    dataRegister.name = !isEmpty(dataRegister.name) ? dataRegister.name : '';
    dataRegister.username = !isEmpty(dataRegister.username) ? dataRegister.username : '';
    dataRegister.password = !isEmpty(dataRegister.password) ? dataRegister.password : '';
    dataRegister.password_confirmation = !isEmpty(dataRegister.password_confirmation)
        ? dataRegister.password_confirmation
        : '';

    if (validator.isEmpty(dataRegister.username)) {
        errors.username = transValidation.auth.username_incorrect;
    }
    if (validator.isEmpty(dataRegister.name)) {
        errors.name = transValidation.auth.name_incorrect;
    }
    if (validator.isEmpty(dataRegister.password)) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (!validator.isLength(dataRegister.password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (validator.isEmpty(dataRegister.password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }
    if (!validator.equals(dataRegister.password, dataRegister.password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const changePassword = (dataChangePassword: IChangePassword) => {
    let errors = <any>{};

    dataChangePassword.old_password = !isEmpty(dataChangePassword.old_password) ? dataChangePassword.old_password : '';
    dataChangePassword.password = !isEmpty(dataChangePassword.password) ? dataChangePassword.password : '';
    dataChangePassword.password_confirmation = !isEmpty(dataChangePassword.password_confirmation)
        ? dataChangePassword.password_confirmation
        : '';

    if (validator.isEmpty(dataChangePassword.old_password)) {
        errors.username = transValidation.auth.old_password_incorrect;
    }
    if (validator.isEmpty(dataChangePassword.password)) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (!validator.isLength(dataChangePassword.password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.password_incorrect;
    }
    if (validator.isEmpty(dataChangePassword.password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }
    if (!validator.equals(dataChangePassword.password, dataChangePassword.password_confirmation)) {
        errors.password_confirmation = transValidation.auth.password_confirmation_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
