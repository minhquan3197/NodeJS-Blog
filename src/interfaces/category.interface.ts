import { Document } from 'mongoose';

export interface ICategoryDocument extends Document {
    name: string;
    createdAt: number;
    updatedAt: number;
    description: string;
}

export interface ICreateCategory {
    name: string;
    description: string;
}
