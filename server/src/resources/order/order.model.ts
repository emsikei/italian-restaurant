import { Schema, model } from 'mongoose';
import IOrder from './order.interface';

const Address = new Schema(
    {
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        houseNumber: {
            type: String,
        },
        apartment: {
            type: String,
        },
        floor: {
            type: String,
        },
        entrance: {
            type: String,
        },
        intercomCode: {
            type: String,
        },
    },
    { _id: false }
);

const Contact = new Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
    },
    { _id: false }
);

const OrderItem = new Schema(
    {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        category: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
        },
    },
    { _id: false }
);

const OrderSchema = new Schema(
    {
        total: {
            type: Number,
        },
        subtotal: {
            type: Number,
        },
        deliveryCost: {
            type: Number,
        },
        contact: {
            type: Contact,
        },
        address: {
            type: Address,
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'DELIVERED', 'CANCELED'],
            default: 'PENDING',
        },
        deliveryType: {
            type: String,
            enum: ['COURIER', 'PICKUP', 'ATPLACE'],
            required: true,
        },
        deliveryTimeType: {
            type: String,
            enum: ['SOONER', 'SCHEDULED'],
            required: true,
        },
        deliveryTime: {
            type: Date,
        },
        paymentMethod: {
            type: String,
            enum: ['CASH', 'CARD_COURIER', 'CARD_WEBSITE', 'CARD_ATPLACE'],
            required: true,
        },
        items: {
            type: [OrderItem],
        },
        comment: {
            type: String,
        },
        orderNumber: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<IOrder>('Order', OrderSchema);
