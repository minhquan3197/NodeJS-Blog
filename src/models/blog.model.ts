import { Schema, Model, model } from 'mongoose';

import { IBlogDocument } from '../interfaces/blog.interface';

export interface IBlog extends IBlogDocument {}

export interface IBlogModel extends Model<IBlog> {}

export const BlogSchema: Schema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
    },
    status: {
        type: Boolean,
        default: false,
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

BlogSchema.statics = {};

BlogSchema.methods = {};

export const Blog: IBlogModel = model<IBlog, IBlogModel>('blog', BlogSchema);

export default Blog;
