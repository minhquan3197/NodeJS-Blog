/**
 * This is function check empty variable
 * @param value
 */
export function isEmpty(value: string): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

/**
 * This is function reverse string
 * @param string
 */
export function revereString(string: string): string {
    const result: any = [];
    for (let index = string.length - 1; index >= 0; index -= 1) {
        result.push(string[index]);
    }
    return result.join('');
}

/**
 * This is function flatten array
 * @param arr
 */
export function flatten(arr: any = []) {
    let result: any = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result = result.concat(item);
        }
    }
    return result;
}
