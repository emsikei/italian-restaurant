import mongoose from 'mongoose';
import ICategory from '@/resources/category/category.interface';

const CategoryTranslation = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const CategorySchema = new mongoose.Schema(
    {
        translations: {
            ro: {
                type: CategoryTranslation,
                required: true,
            },
            ru: {
                type: CategoryTranslation,
                required: true,
            },
            en: {
                type: CategoryTranslation,
                required: true,
            },
        },
        slug: { type: String, required: true },
        products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
