import validator from 'validator';

import { ICreateBlog } from '../interfaces/blog.interface';
import { isEmpty } from '../helpers/string.helper';
import { transValidation } from '../lang/vi';

export const createBlog = (dataBlog: ICreateBlog) => {
    let errors = <any>{};

    dataBlog.name = !isEmpty(dataBlog.name) ? dataBlog.name : '';
    dataBlog.content = !isEmpty(dataBlog.content) ? dataBlog.content : '';
    dataBlog.image = !isEmpty(dataBlog.image) ? dataBlog.image : '';
    dataBlog.categoryId = !isEmpty(dataBlog.categoryId)
        ? dataBlog.categoryId
        : '';

    if (validator.isEmpty(dataBlog.name)) {
        errors.name = transValidation.blog.name_incorrect;
    }
    if (validator.isEmpty(dataBlog.content)) {
        errors.content = transValidation.blog.content_incorrect;
    }
    if (validator.isEmpty(dataBlog.image)) {
        errors.image = transValidation.blog.image_incorrect;
    }
    if (validator.isEmpty(dataBlog.categoryId)) {
        errors.categoryId = transValidation.blog.category_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
