import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
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
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
})

userSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id });
}

export const User = model<TUser, UserModel>('User', userSchema);