import { Schema, Model, model, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    created_at: number;
    updated_at: number;
}

export interface ICategoryModel extends Model<ICategory> {
    pushByCategory(id: string, blogId: string): any;
    pullByCategory(id: string, blogId: string): any;
}

export const CategorySchema: Schema = new Schema({
    name: {
        type: String,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'blogs',
        },
    ],
    created_at: {
        type: Number,
        default: Date.now,
    },
    updated_at: {
        type: Number,
        default: null,
    },
});

CategorySchema.statics = {
    pushByCategory(id: string, blogId: string): any {
        return this.findOneAndUpdate({ _id: id }, { $push: { blogs: blogId } }).exec();
    },
    pullByCategory(id: string, blogId: string): any {
        return this.findOneAndUpdate({ _id: id }, { $pull: { blogs: blogId } }).exec();
    },
};

export const Category: ICategoryModel = model<ICategory, ICategoryModel>('categories', CategorySchema);

export default Category;