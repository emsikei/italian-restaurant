import { Types } from 'mongoose';
import { ResetPasswordToken, Role } from '@/utils/types';

export default interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    roles: Role[];
    token: ResetPasswordToken;
}
