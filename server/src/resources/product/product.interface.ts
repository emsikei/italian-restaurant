import { Types } from 'mongoose';
import { ProductStatus, ProductTranslations, SizeAndPrice } from '@/utils/types/product.types';

export default interface IProduct {
    _id: Types.ObjectId;
    publicId: string;
    imageUrl: string;
    discount?: number;
    translations: ProductTranslations;
    status: ProductStatus;
    defaultPriceAndSize: SizeAndPrice;
    pricesAndSizes: SizeAndPrice[];
    recommendedProducts: Types.ObjectId[];
    category: Types.ObjectId;
}
