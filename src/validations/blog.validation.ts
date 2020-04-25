import validator from 'validator';

import { transValidation } from '../lang/en';
import { isEmpty } from '../utils/function.util';
import { IBlogInput } from '../interfaces/blog.interface';

export const blogInput = (dataBlog: IBlogInput) => {
    let errors = <any>{};

    let { name, content, image, category_id } = dataBlog;

    name = !isEmpty(name) ? name : '';
    content = !isEmpty(content) ? content : '';
    image = !isEmpty(image) ? image : '';
    category_id = !isEmpty(category_id) ? category_id : '';

    if (validator.isEmpty(name)) {
        errors.name = transValidation.blog.name_incorrect;
    }
    if (validator.isEmpty(content)) {
        errors.content = transValidation.blog.content_incorrect;
    }
    if (validator.isEmpty(image)) {
        errors.image = transValidation.blog.image_incorrect;
    }
    if (validator.isEmpty(category_id)) {
        errors.category_id = transValidation.blog.category_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
