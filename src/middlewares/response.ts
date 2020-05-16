import { isUndefined, isNull } from 'lodash';
import { Response, Request, NextFunction } from 'express';

import { transErrors } from '../lang/en';

export default (req: Request, res: Response, next: NextFunction): void => {
    const { data } = res.locals;
    const { status } = res.locals;

    if (isUndefined(data) || isNull(data)) {
        next(new Error(transErrors.system.responseEmpty));
    } else {
        res.status(status || 200).send({
            data,
            errors: null,
            status: true,
        });
    }
};
