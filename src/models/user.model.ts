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
    comparePassword(inputPassword: string): Boolean;
    pushBlogToUserBlogs(id: string, blogId: string): any;
    pullBlogFromUser(id: string, blogId: string): any;
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
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'blogs',
        },
    ],
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
    comparePassword(inputPassword: string): any {
        return compare(inputPassword, this.password);
    },
    pushBlogToUserBlogs(id: string, blogId: string): any {
        return this.findOneAndUpdate({ _id: id }, { $push: { blogs: blogId } }).exec();
    },
    pullBlogFromUser(id: string, blogId: string): any {
        return this.findOneAndUpdate({ _id: id }, { $pull: { blogs: blogId } }).exec();
    },
};

export const User: IUserModel = model<IUser, IUserModel>('users', UserSchema);

export default User;
