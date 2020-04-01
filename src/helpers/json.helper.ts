import { transErrors, transSuccess } from '../lang/vi';

export function dataSuccess(
    message: string = transSuccess.system.success,
    data: any = null,
    result_code: number = 200,
) {
    return {
        status: true,
        result_code,
        message,
        data,
    };
}

export function dataError(
    message: string = transErrors.system.server_error,
    data: any = null,
    result_code: number = 400,
) {
    return {
        status: false,
        result_code,
        message,
        data,
    };
}
