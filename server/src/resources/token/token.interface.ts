import { Types } from 'mongoose';

export default interface IRefreshToken {
    _id: Types.ObjectId;
    userId: string;
    refreshToken: string;
    expiresAt: Date;
    ua: string;
    fingerprint: string;
    ip: string;
}
