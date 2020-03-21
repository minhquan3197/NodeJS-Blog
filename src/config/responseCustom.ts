export function dataSuccess(
    message: string,
    data: any,
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
    message: string,
    data: any,
    result_code: number = 400,
) {
    return {
        status: false,
        result_code,
        message,
        data,
    };
}
