import { Schema, model } from 'mongoose';
import IUser from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        roles: {
            type: [String],
            enum: ['ADMIN', 'USER'],
            default: 'USER',
        },
        token: {
            value: String,
            expiresIn: Date,
            isUsed: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default model<IUser>('User', UserSchema);
