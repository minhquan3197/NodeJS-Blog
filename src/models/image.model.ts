import { Schema, Model, model } from 'mongoose';

import { IImageDocument } from '../interfaces/image.interface';

export interface IImage extends IImageDocument {}

export interface IImageModel extends Model<IImage> {}

export const ImageSchema: Schema = new Schema({
    url: {
        type: String,
        required: true,
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

ImageSchema.statics = {};

ImageSchema.methods = {};

export const Image: IImageModel = model<IImage, IImageModel>(
    'images',
    ImageSchema,
);

export default Image;
