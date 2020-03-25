import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    password: string;
    createdAt: number;
    updatedAt: number;
}
