import { Schema, Model, model, Document } from 'mongoose';

import { compare } from '../helpers/auth.helper';

export interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    avatar: string;
    is_admin: boolean;
    created_at: number;
    updated_at: number;
}

export interface IUserModel extends Model<IUser> {
    changePassword(id: string, hashedPassword: string): IUser;
    comparePassword(inputPassword: string, userPassword: string): Promise<Boolean>;
}

export const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
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
    created_at: {
        type: Number,
        default: Date.now,
    },
    updated_at: {
        type: Number,
        default: null,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.statics = {
    changePassword(id: string, hashedPassword: string): IUser {
        return this.findOneAndUpdate({ _id: id }, { password: hashedPassword }).exec();
    },
    async comparePassword(inputPassword: string, userPassword: string): Promise<Boolean> {
        return await compare(inputPassword, userPassword);
    },
};

export const User: IUserModel = model<IUser, IUserModel>('users', UserSchema);

export default User;
