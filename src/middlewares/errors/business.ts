import CustomError from '../../config/error';

class BusinessError extends CustomError {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export default BusinessError;
