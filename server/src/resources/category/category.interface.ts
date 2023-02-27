import { Types } from 'mongoose';
import { CategoryTranslations } from '@/utils/types';

export default interface ICategory {
    _id: Types.ObjectId;
    slug?: string;
    translations: CategoryTranslations;
    products: Types.ObjectId[];
}
