import { Schema, model, SchemaTypes } from 'mongoose';
import IProduct from '@/resources/product/product.interface';

const ProductTransation = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const ProductStatus = new Schema(
    {
        onlineMenu: {
            type: Boolean,
            default: false,
        },
        offlineMenu: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const PriceAndSize = new Schema(
    {
        size: { type: Schema.Types.ObjectId, ref: 'Size' },
        price: Number,
    },
    {
        _id: false,
    }
);

const ProductSchema = new Schema(
    {
        publicId: { type: String },
        imageUrl: { type: String },
        discount: { type: Number, default: 0 },
        status: { type: ProductStatus, required: true },
        defaultPriceAndSize: { type: PriceAndSize, required: true },
        pricesAndSizes: [{ type: PriceAndSize, required: true }],
        translations: {
            ro: {
                type: ProductTransation,
                required: true,
            },
            ru: {
                type: ProductTransation,
                required: true,
            },
            en: {
                type: ProductTransation,
                required: true,
            },
        },
        recommendedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
    },
    { timestamps: true }
);

export default model<IProduct>('Product', ProductSchema);
