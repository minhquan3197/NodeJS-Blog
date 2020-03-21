export function dataSuccess(message: string, data: any) {
    return {
        status: true,
        message,
        data,
    };
}

export function dataError(message: string, data: any, result_code?: number) {
    return {
        status: false,
        result_code,
        message,
        data,
    };
}
