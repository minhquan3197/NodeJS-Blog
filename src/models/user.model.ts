import * as bcrypt from 'bcryptjs';
import { Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/user.interface';

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {
    password(id: string, hashedPassword: string): IUser;
}

export const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png',
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: null,
    },
});

UserSchema.statics = {
    password(id: string, hashedPassword: string): IUser {
        return this.findOneAndUpdate({ _id: id }, { password: hashedPassword }).exec();
    },
};

UserSchema.methods = {};

export const User: IUserModel = model<IUser, IUserModel>('users', UserSchema);

export default User;
