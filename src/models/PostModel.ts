import { Schema, Model, model, Document } from 'mongoose';


interface BlogDocument extends IBlog, Document {
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
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
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

// BlogSchema.statics = {
//     blogPaginate(paginate: any, customFind: object, selectField: string): any {
//         const { limit, page } = paginate;
//         let query = this.find(customFind);
//         if (selectField) query.select(customFind);
//         return query
//             .sort({ _id: -1 })
//             .populate('category_id', { name: 'name' })
//             .skip(limit * page - limit)
//             .limit(limit);
//     },
//     changeStatus(id: string): any {
//         return this.findOneAndUpdate({ _id: id }, { $set: { status: !this.status } }).exec();
//     },
// };

UserSchema.index({
    name: 'text',
    address: 'text',
    email: 'text',
    phoneNumber: 'text',
});

export default model<IBlog, IBlogModel>('blogs', BlogSchema);
