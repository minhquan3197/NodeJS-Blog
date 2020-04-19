import mongoose from 'mongoose';
import { MyError } from './error.util';
import { transErrors } from '../lang/en';

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
 * This is function check object by id
 * @param ids
 */
export function checkObjectId(...ids: Array<any>) {
    try {
        ids.forEach((id: any) => new mongoose.Types.ObjectId(id.toString()));
    } catch (error) {
        throw new MyError(transErrors.system.object_id_invalid, 400);
    }
}

/**
 * This is function reverse string
 * @param string
 */
export function revereString(string: string): string {
    let result: any = [];
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
    for (let item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result = result.concat(item);
        }
    }
    return result;
}
