import ISize from '@/resources/size/size.interface';
import { BasePagination } from './common.types';

export type SizeTranslation = {
    value: string;
};

export type SizeTranslations = {
    ro: SizeTranslation;
    ru: SizeTranslation;
    en: SizeTranslation;
};

export type SizeCreate = Pick<ISize, 'translations'>;

export type SizesWithPagination = { data: ISize[] } & BasePagination;
