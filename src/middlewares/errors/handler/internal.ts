import CustomError from './custom';
import Logger from '../../services/Logger';

class InternalError extends CustomError {
    constructor(error: Error) {
        super(error.message);
        const callerLine = error.stack.split('\n')[4];
        const index = callerLine.indexOf('at ');
        const clean = callerLine.slice(index + 2, callerLine.length);
        Logger.error(clean);
    }
}

export default InternalError;
