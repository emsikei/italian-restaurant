import ISize from '@/resources/size/size.interface';
import { SizeTranslations } from '@/utils/types/size.types';

export default class SizeDto {
    public _id: string;

    public translations: SizeTranslations;

    constructor(size: ISize) {
        this._id = size._id.toString();
        this.translations = size.translations;
    }
}
