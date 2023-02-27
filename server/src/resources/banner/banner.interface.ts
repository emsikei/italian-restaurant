import { Types } from 'mongoose';

export default interface IBanner {
    _id: Types.ObjectId;
    publicId: string;
    bannerUrl: string;
}
