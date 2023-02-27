export type DeliveryType = 'PICKUP' | 'COURIER' | '';

export type DeliveryTimeType = 'SCHEDULED' | 'SOONER' | '';

export type PaymentMethod = 'CASH' | 'CARD_COURIER' | '';

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'FINISHED' | 'CANCELED';

export type Address = {
    city?: string;
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

export type OrderItem = {
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    category: string;
};

export type IOrder = {
    _id?: string;
    orderNumber?: string;
    orderTime?: Date;
    status?: OrderStatus;
    contact: Contact;
    address?: Address;
    deliveryType: DeliveryType;
    paymentMethod: PaymentMethod;
    deliveryTimeType: DeliveryTimeType;
    deliveryTime?: Date;
    comment?: string;
    items?: OrderItem[];
    subtotal?: number;
    deliveryCost?: number;
    total?: number;
    createdAt?: Date;
    updatedAt?: Date;
};
