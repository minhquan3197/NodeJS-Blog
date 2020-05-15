import { transErrors, transSuccess } from '../lang/en';

/**
 * This is function return sucesss
 * @param message
 * @param data
 * @param result_code
 */
export function dataSuccess(
    data: any = null,
    message: string = transSuccess.system.success,
    result_code = 200,
) {
    return {
        status: true,
        result_code,
        message,
        data,
    };
}

/**
 * This is function return error
 * @param message
 * @param data
 * @param result_code
 */
export function dataError(
    message: string = transErrors.system.server_error,
    data: any = null,
    result_code = 400,
) {
    return {
        status: false,
        result_code,
        message,
        data,
    };
}
