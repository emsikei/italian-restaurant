import ICategory from '@/resources/category/category.interface';
import { BasePagination } from './common.types';

export type CategoryCreation = Omit<ICategory, '_id' | 'products'>;

export type CategoryUpdate = Omit<ICategory, 'products'>;

export type CategoryTranslation = {
    name: string;
};

export type CategoryTranslations = {
    ro: CategoryTranslation;
    ru: CategoryTranslation;
    en: CategoryTranslation;
};

export type CategoriesWithPagination = { data: ICategory[] } & BasePagination;
