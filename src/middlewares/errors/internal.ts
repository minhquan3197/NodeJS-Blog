import Logger from '../../config/Logger';

class InternalError extends Error {
    constructor(error: Error | any) {
        super();
        const callerLine = error.stack.split('\n')[4];
        const index = callerLine.indexOf('at ');
        const clean = callerLine.slice(index + 2, callerLine.length);
        this.message = error.message;
        Logger.error(clean);
    }
}

export default InternalError;
