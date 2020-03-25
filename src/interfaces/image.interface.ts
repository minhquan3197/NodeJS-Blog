import { Document } from 'mongoose';

export interface IImageDocument extends Document {
    url: string;
    createdAt: number;
    updatedAt: number;
}
