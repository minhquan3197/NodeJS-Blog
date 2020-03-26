import { Schema, Model, model } from 'mongoose';

import { IBlogDocument } from '../interfaces/blog.interface';

export interface IBlog extends IBlogDocument {}

export interface IBlogModel extends Model<IBlog> {
    paginate(
        resPerPage: number,
        customFind: object,
        page: number,
        selectField?: object,
    ): any;
    detail(id: string, options: object): IBlog | null;
    status(id: string, status: boolean): IBlog;
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

BlogSchema.statics = {
    paginate(
        resPerPage: number,
        customFind: object,
        page: number,
        selectField = null,
    ) {
        let query = this.find(customFind);
        if (selectField) query.select(selectField);
        return query
            .sort({ _id: -1 })
            .populate('categoryId', { name: 'name' })
            .skip(resPerPage * page - resPerPage)
            .limit(resPerPage);
    },
    detail(id: string, options = <any>{}): IBlog | null {
        let status = options.status ? options.status : null;
        if (status) return this.findOne({ _id: id, status: true }).exec();
        return this.findOne({ _id: id }).exec();
    },
    status(id: string, status: boolean): IBlog {
        return this.findOneAndUpdate(
            { _id: id },
            { $set: { status: !status } },
        ).exec();
    },
};

BlogSchema.methods = {};

export const Blog: IBlogModel = model<IBlog, IBlogModel>('blog', BlogSchema);

export default Blog;
