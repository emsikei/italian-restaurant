import { IOrder } from '../types/order';
import { CheckoutValidationErrors, LoginValidationErrors } from '../types/validation';

export const initialCheckoutState: IOrder = {
    contact: {
        customerName: '',
        phoneNumber: '',
        email: '',
    },
    address: {
        city: '',
        street: '',
        houseNumber: '',
        apartment: '',
        floor: '',
        entrance: '',
        intercomCode: '',
    },
    deliveryType: 'COURIER',
    paymentMethod: 'CASH',
    deliveryTimeType: 'SOONER',
    deliveryTime: undefined,
    comment: '',
};

export const initialCheckoutValidationErrors: CheckoutValidationErrors = {
    contact: {
        customerName: '',
        phoneNumber: '',
        email: '',
    },
    address: {
        street: '',
        houseNumber: '',
        apartment: '',
    },
};

export const initialLoginValidationErrors: LoginValidationErrors = {
    email: '',
    password: '',
};
