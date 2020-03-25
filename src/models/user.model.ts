import * as bcrypt from 'bcryptjs';
import { Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/user.interface';

export interface IUser extends IUserDocument {
    comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): string;
    countUser(): number;
    createUser(data: object): IUser;
    findUserByEmail(email: string): IUser;
    findUserById(id: string): IUser;
    updateUserPassword(id: string, hashedPassword: string): IUser;
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        trim: true,
    },
    password: String,
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
});

UserSchema.statics = {
    hashPassword(password: string): string {
        return bcrypt.hashSync(password);
    },
    countUser(): number {
        return this.countDocuments().exec();
    },
    createUser(data: object): IUser {
        return this.create(data);
    },
    findUserByEmail(email: string): IUser {
        return this.findOne({ email: email }).exec();
    },
    findUserById(id: string): IUser {
        return this.findById(id).exec();
    },
    updateUserPassword(id: string, hashedPassword: string): IUser {
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
