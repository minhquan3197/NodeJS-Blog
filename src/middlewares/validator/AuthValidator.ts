import validator from 'validator';

import { isEmpty } from '../../utils/function';
import { transValidation } from '../../lang/en';
import { Login, Register, ChangePassword } from '../../interfaces/User';

export const login = (payload: Login) => {
    let errors = <any>{};

    let { username, password } = payload;

    if (validator.isEmpty(username)) {
        errors.username = transValidation.auth.usernameIncorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.passwordIncorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const register = (payload: Register) => {
    let errors = <any>{};

    let { name, username, password, passwordConfirmation } = payload;

    if (validator.isEmpty(username)) {
        errors.username = transValidation.auth.usernameIncorrect;
    }
    if (validator.isEmpty(name)) {
        errors.name = transValidation.auth.nameIncorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.passwordIncorrect;
    }
    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.passwordIncorrect;
    }
    if (validator.isEmpty(passwordConfirmation)) {
        errors.passwordConfirmation = transValidation.auth.passwordConfirmationIncorrect;
    }
    if (!validator.equals(password, passwordConfirmation)) {
        errors.passwordConfirmation = transValidation.auth.passwordConfirmationIncorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export const changePassword = (payload: ChangePassword) => {
    let errors = <any>{};

    let { oldPassword, passwordConfirmation, password } = payload;

    if (validator.isEmpty(oldPassword)) {
        errors.oldPassword = transValidation.auth.oldPasswordIncorrect;
    }
    if (validator.isEmpty(password)) {
        errors.password = transValidation.auth.passwordIncorrect;
    }
    if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = transValidation.auth.passwordIncorrect;
    }
    if (validator.isEmpty(passwordConfirmation)) {
        errors.passwordConfirmation = transValidation.auth.passwordConfirmationIncorrect;
    }
    if (!validator.equals(password, passwordConfirmation)) {
        errors.passwordConfirmation = transValidation.auth.passwordConfirmationIncorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
