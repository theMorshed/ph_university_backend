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
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date
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
    return await User.findOne({ id }).select('+password');
}

userSchema.statics.isPasswordMatched = async function(userPassword: string, hashedPassword: string) {
    return await bcrypt.compare(userPassword, hashedPassword);
}

userSchema.statics.isDeleted = async function (id: string): Promise<boolean | undefined> {
    const isDel = await User.findOne({ id }, {_id: 0, isDeleted: 1});
    return isDel?.isDeleted;
}

userSchema.statics.status = async function (id: string): Promise<"in-progress" | "blocked" | undefined> {
    const ustatus = await User.findOne({ id }).select('status');
    return ustatus?.status;
}

userSchema.statics.isJWTIssuedBeforePasswordChange = function(passwordChangedAt: Date, jwtIssuedAt: number) {
    const passwordChangedTime = new Date(passwordChangedAt).getTime() / 1000;
    return passwordChangedTime > jwtIssuedAt;
}

export const User = model<TUser, UserModel>('User', userSchema);