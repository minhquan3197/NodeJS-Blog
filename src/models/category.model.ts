import { Schema, Model, model } from 'mongoose';

import { ICategoryDocument } from '../interfaces/category.interface';

export interface ICategory extends ICategoryDocument {}

export interface ICategoryModel extends Model<ICategory> {}

export const CategorySchema: Schema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
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

CategorySchema.statics = {};

CategorySchema.methods = {};

export const Category: ICategoryModel = model<ICategory, ICategoryModel>(
    'category',
    CategorySchema,
);

export default Category;
