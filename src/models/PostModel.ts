import { Schema, model, Document } from 'mongoose'

import BaseSchema from './BaseModel'
import { Post } from '../interfaces/Post'

interface PostDocument extends Post, Document {
    createdAt: Date
    updatedAt: Date
    status: boolean
}

export const PostSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'posts',
        },
        ...BaseSchema,
    },
    { timestamps: true },
)

PostSchema.index({ name: 'text' })

export default model<PostDocument>('posts', PostSchema)
