import { ro, ru, en } from '../locales';
import { OrderStatus } from '../types/order';
import { ITranslation } from '../types/translation';

export const DELIVERY_FREE: number = 500;

export const DELIVERY_PRICE: number = 50;

export const LANGS: string[] = ['ro', 'ru', 'en'];

export const LANG_TABLE: Record<string, ITranslation> = { ro, ru, en };

export type FormType = 'create' | 'edit';

export const ORDER_STATUSES: OrderStatus[] = ['PENDING', 'ACCEPTED', 'FINISHED', 'CANCELED'];
