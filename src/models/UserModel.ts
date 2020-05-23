import { Schema, model, Document } from 'mongoose'

import BaseSchema from './BaseModel'
import { User } from '../interfaces/User'

interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
}

export const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
        },
        ...BaseSchema,
    },
    { timestamps: true },
)

UserSchema.index({ name: 'text', username: 'text' })

export default model<UserDocument>('users', UserSchema)
