import validator from 'validator';

import { transValidation } from '../lang/en';
import { isEmpty } from '../utils/function.util';
import { IBlogInput } from '../interfaces/blog.interface';

export const blogInput = (dataBlog: IBlogInput) => {
    let errors = <any>{};

    let { name, content, image } = dataBlog;

    name = !isEmpty(name) ? name : '';
    content = !isEmpty(content) ? content : '';
    image = !isEmpty(image) ? image : '';

    if (validator.isEmpty(name)) {
        errors.name = transValidation.blog.name_incorrect;
    }
    if (validator.isEmpty(content)) {
        errors.content = transValidation.blog.content_incorrect;
    }
    if (validator.isEmpty(image)) {
        errors.image = transValidation.blog.image_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
