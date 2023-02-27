import { Types } from 'mongoose';
import { SizeTranslations } from '@/utils/types/size.types';

export default interface ISize {
    _id: Types.ObjectId;
    translations: SizeTranslations;
}
