import { ICategory } from './category';
import { ISize } from './size';

interface IProductTranslation {
    name: string;
    description: string;
}

export interface IProductTranslations {
    ro: IProductTranslation;
    ru: IProductTranslation;
    en: IProductTranslation;
}

export type ProductStatus = {
    onlineMenu: boolean;
    offlineMenu: boolean;
};

export type PriceAndSize = {
    size: ISize;
    price: number;
};

export interface IProduct {
    _id?: string;
    imageUrl?: string;
    publicId?: string;
    discount?: number;
    status: ProductStatus;
    defaultPriceAndSize?: PriceAndSize;
    pricesAndSizes: PriceAndSize[];
    translations: IProductTranslations;
    recommendedProducts: IProduct[];
    category: ICategory;
    imageLocal?: File;
    imageLocalUrl?: string;
}

export type ProductCreate = Omit<IProduct, '_id' | 'publicId' | 'category'> & {
    _id?: string;
    publicId?: string;
    category: string;
};
