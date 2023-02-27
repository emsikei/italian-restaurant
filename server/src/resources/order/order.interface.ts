import { Types } from 'mongoose';
import { ContactInfo as Contact, OrderItem, OrderStatus, PaymentMethod, Address } from '@/utils/types';
import { DeliveryTimeType, DeliveryType } from '@/utils/types/order.types';

export default interface IOrder {
    _id: Types.ObjectId;
    orderNumber: string;
    contact: Contact;
    address?: Address;
    status?: OrderStatus;
    deliveryType: DeliveryType;
    paymentMethod: PaymentMethod;
    deliveryTime?: Date;
    deliveryTimeType?: DeliveryTimeType;
    comment?: string;
    items: OrderItem[];
    total: number;
    subtotal: number;
    deliveryCost: number;
    createdAt: Date;
    updatedAt: Date;
}
