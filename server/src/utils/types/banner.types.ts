import IBanner from '@/resources/banner/banner.interface';
import { BasePagination } from './common.types';

export type BannersWithPagination = { data: IBanner[] } & BasePagination;
