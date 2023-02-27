import { Schema, model } from 'mongoose';
import ISize from './size.interface';

const SizeTranslation = new Schema(
    {
        value: String,
    },
    { _id: false }
);

const SizeSchema = new Schema(
    {
        translations: {
            ro: {
                type: SizeTranslation,
                required: true,
            },
            ru: {
                type: SizeTranslation,
                required: true,
            },
            en: {
                type: SizeTranslation,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default model<ISize>('Size', SizeSchema);
