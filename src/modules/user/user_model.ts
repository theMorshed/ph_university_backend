import { model, Schema } from "mongoose";
import { TUser } from "./user_interface";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const userModel = model<TUser>('User', userSchema);