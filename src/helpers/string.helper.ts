import mongoose from 'mongoose';
import { MyError } from './error.helper';
import { transErrors } from '../lang/vi';

export function isEmpty(value: string): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export function checkObjectId(...ids: Array<any>) {
    try {
        ids.forEach((id: any) => new mongoose.Types.ObjectId(id.toString()));
    } catch (error) {
        throw new MyError(transErrors.system.object_id_invalid, 400);
    }
}
