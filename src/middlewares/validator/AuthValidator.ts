import validator from 'validator';

import { isEmpty } from '../../utils/function';
import { transValidation } from '../../lang/en';
import { Login, Register, ChangePassword } from '../../interfaces/User';

export const loginValidate = (payload: Login) => {
    const errors: any = {};
    const { username = '', password = '' } = payload;
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

export const registerValidate = (payload: Register) => {
    const errors: any = {};

    const { name = '', username = '', password = '', passwordConfirmation = '' } = payload;

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

export const changePasswordValidate = (payload: ChangePassword) => {
    const errors: any = {};

    const { oldPassword = '', passwordConfirmation = '', password = '' } = payload;

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
