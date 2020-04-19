import { Schema, Model, model, Document } from 'mongoose';

export interface IBlog extends Document {
    name: string;
    content: string;
    image: string;
    status: boolean;
    created_by: any;
    created_at: number;
    updated_at: number;
}

export interface IBlogModel extends Model<IBlog> {
    blogPaginate(pagiante: any, customFind: any, selectField: string): any;
    changeStatus(idBlog: string): any;
}

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

BlogSchema.statics = {
    blogPaginate(paginate: any, customFind: object, selectField: string): any {
        const { limit, page } = paginate;
        let query = this.find(customFind);
        if (selectField) query.select(customFind);
        return query
            .sort({ _id: -1 })
            .populate('created_by', { name: 'name', username: 'username', avatar: 'avatar' })
            .skip(limit * page - limit)
            .limit(limit);
    },
    changeStatus(id: string): any {
        return this.findOneAndUpdate({ _id: id }, { $set: { status: !this.status } }).exec();
    },
};

export const Blog: IBlogModel = model<IBlog, IBlogModel>('blogs', BlogSchema);

export default Blog;
