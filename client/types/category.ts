import { IProduct } from './product';

interface ICategoryTranslation {
    name: string;
}

interface ICategoryTranslations {
    ro: ICategoryTranslation;
    ru: ICategoryTranslation;
    en: ICategoryTranslation;
}

export interface ICategory {
    _id?: string;
    slug?: string;
    translations: ICategoryTranslations;
    products?: IProduct[];
}

export type CategoryCreate = Pick<ICategory, 'translations'>;
