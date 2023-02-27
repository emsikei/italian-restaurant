import mongoose from 'mongoose';
import IBanner from '@/resources/banner/banner.interface';

const BannerSchema = new mongoose.Schema(
    {
        publicId: { type: String, required: true },
        bannerUrl: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IBanner>('Banner', BannerSchema);
