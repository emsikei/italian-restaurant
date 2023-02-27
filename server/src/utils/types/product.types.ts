import IProduct from '@/resources/product/product.interface';
import { BasePagination, PaginationQuery } from './common.types';

export type ProductCreation = Omit<IProduct, '_id' | 'publicId' | 'imageUrl'>;

export type ProductUpdate = IProduct;

export type SizeAndPrice = {
    size: string;
    price: number;
};

export type ProductStatus = {
    onlineMenu: boolean;
    offlineMenu: boolean;
};

export type ProductTranslation = {
    name: string;
    description: string;
};

export type ProductTranslations = {
    ro: ProductTranslation;
    ru: ProductTranslation;
    en: ProductTranslation;
};

export type ProductsWithPagination = { data: IProduct[] } & BasePagination;

export type ProductsQuery = { all?: boolean } & PaginationQuery;
