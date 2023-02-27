import { Schema, model } from 'mongoose';
import IRefreshToken from './token.interface';

const RefreshTokenSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        refreshToken: { type: String },
        fingerprint: { type: String },
        expiresAt: { type: Date },
        ua: { type: String },
        ip: { type: String },
    },
    {
        timestamps: true,
    }
);

export default model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
