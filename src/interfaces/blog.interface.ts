import { Document } from 'mongoose';
import { ICategoryDocument } from './category.interface';

export interface IBlogDocument extends Document {
    name: string;
    image: string;
    status: boolean;
    content: string;
    createdAt: number;
    updatedAt: number;
    categoryId: ICategoryDocument;
}

export interface ICreateBlog {
    name: string;
    content: string;
    image: string;
    categoryId: string;
}
