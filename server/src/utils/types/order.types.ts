import IOrder from '@/resources/order/order.interface';
import { BasePagination } from './common.types';

export type OrderItem = {
    id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    size: string;
};

export type Address = {
    city: string;
    street: string;
    houseNumber: string;
    apartment: string;
    floor?: string;
    entrance?: string;
    intercomCode?: string;
};

export type Contact = {
    customerName: string;
    phoneNumber: string;
    email?: string;
};

export type OrdersWithPagination = { data: IOrder[] } & BasePagination;

export type OrderCreate = Omit<IOrder, '_id' | 'orderNumber' | 'createdAt' | 'updatedAt'>;

export type DeliveryTimeType = 'SOONER' | 'SCHEDULED';

export type DeliveryType = 'COURIER' | 'PICKUP' | 'ATPLACE';

export type PaymentMethod = 'CASH' | 'CARD_COURIER' | 'CARD_WEBSITE' | 'CARD_ATPLACE';

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'FINISHED' | 'CANCELED';

export type OrderFilter = { status?: string };
