import ILocality from '@/resources/locality/locality.interface';
import { BasePagination } from './common.types';

export type LocalityCreation = Omit<ILocality, '_id'>;

export type LocalitiesWithPagination = { data: ILocality[] } & BasePagination;
