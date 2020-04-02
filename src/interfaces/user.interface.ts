import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    username: string;
    avatar: string;
    password: string;
    createdAt: number;
    updatedAt: number;
}
