import { Types } from 'mongoose';

export default interface ILocality {
    _id: Types.ObjectId;
    name: string;
    deliveryCost: number;
}
