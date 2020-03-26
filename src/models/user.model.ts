import * as bcrypt from 'bcryptjs';
import { Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/user.interface';

export interface IUser extends IUserDocument {
    comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
    hash(password: string): string;
    password(id: string, hashedPassword: string): IUser;
}

export const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default:
            'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png',
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: null,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.statics = {
    hash(password: string): string {
        return bcrypt.hashSync(password);
    },
    password(id: string, hashedPassword: string): IUser {
        return this.findOneAndUpdate(
            { _id: id },
            { password: hashedPassword },
        ).exec();
    },
};

UserSchema.methods = {
    comparePassword(password: string): boolean {
        if (bcrypt.compareSync(password, this.password)) return true;
        return false;
    },
};

export const User: IUserModel = model<IUser, IUserModel>('users', UserSchema);

export default User;
