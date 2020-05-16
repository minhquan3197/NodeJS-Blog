import validator from 'validator';

import { Post } from '../../interfaces/Post';
import { isEmpty } from '../../utils/function';
import { transValidation } from '../../lang/en';

export const postInput = (payload: Post) => {
    let errors = <any>{};

    let { name, userId } = payload;

    if (validator.isEmpty(name)) {
        errors.name = transValidation.post.nameIncorrect;
    }
    if (validator.isEmpty(userId)) {
        errors.content = transValidation.post.userIncorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
