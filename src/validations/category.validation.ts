import validator from 'validator';

import { transValidation } from '../lang/en';
import { isEmpty } from '../utils/function.util';
import { ICategoryInput } from '../interfaces/category.interface';

export const categoryInput = (dataCategory: ICategoryInput) => {
    let errors = <any>{};

    let { name } = dataCategory;

    name = !isEmpty(name) ? name : '';

    if (validator.isEmpty(name)) {
        errors.name = transValidation.category.name_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
