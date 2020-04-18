import { Schema, Model, model, Document } from 'mongoose';

export interface IBlog extends Document {
    name: string;
    content: string;
    image: string;
    status: boolean;
    created_at: number;
    updated_at: number;
}

export interface IBlogModel extends Model<IBlog> {}

export const BlogSchema: Schema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    created_at: {
        type: Number,
        default: Date.now,
    },
    updated_at: {
        type: Number,
        default: null,
    },
});

BlogSchema.statics = {};

export const Blog: IBlogModel = model<IBlog, IBlogModel>('blogs', BlogSchema);

export default Blog;
