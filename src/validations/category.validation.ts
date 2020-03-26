import validator from 'validator';

import { ICreateCategory } from '../interfaces/category.interface';
import { isEmpty } from '../helpers/string.helper';
import { transValidation } from '../lang/vi';

export const createCategory = (dataCategory: ICreateCategory) => {
    let errors = <any>{};

    dataCategory.name = !isEmpty(dataCategory.name) ? dataCategory.name : '';
    dataCategory.description = !isEmpty(dataCategory.description)
        ? dataCategory.description
        : '';

    if (validator.isEmpty(dataCategory.name)) {
        errors.name = transValidation.category.name_incorrect;
    }
    if (validator.isEmpty(dataCategory.description)) {
        errors.description = transValidation.category.description_incorrect;
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
