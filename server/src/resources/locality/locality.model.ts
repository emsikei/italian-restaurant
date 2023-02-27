import mongoose from 'mongoose';
import ILocality from '@/resources/locality/locality.interface';

const LocalitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        deliveryCost: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ILocality>('Locality', LocalitySchema);
