import { ChangeEvent, FormEvent, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import isToday from 'dayjs/plugin/isToday';
import Address from './Address';
import Comment from './Comment';
import ContactInfo from './ContactInfo';
import DeliveryTime from './DeliveryTimeType';
import PaymentMethod from './PaymentMethod';
import DeliveryType from './DeliveryType';
import { IOrder } from '../../types/order';
import { initialCheckoutState, initialCheckoutValidationErrors } from '../../states/order';
import useTranslations from '../../hooks/useTranslations';
import { CheckoutValidationErrors, CheckoutValidationReturn } from '../../types/validation';
import { copyObject } from '../../helpers';

import 'dayjs/locale/ro';
import { useCart } from '../../contexts/cart.context';
import useCartCalc from '../../hooks/useCartCalc';
import { mapCartItemsToOrderItems } from '../../helpers/mapper';
import { poster } from '../../lib/fetcher';

dayjs.extend(calendar);
dayjs.extend(isToday);
dayjs().format();
dayjs.locale('ro');

const CheckoutForm = () => {
    const [formValues, setFormValues] = useState<IOrder>(initialCheckoutState);
    const [validationErrors, setValidationErrors] = useState<CheckoutValidationErrors>(
        copyObject(initialCheckoutValidationErrors)
    );

    const [isPickUp, setIsPickUp] = useState<boolean>(false);
    const [isScheduledOrder, setIsScheduledOrder] = useState<boolean>(false);

    const t = useTranslations();
    const { cart } = useCart();
    const { subtotal, deliveryCost, total } = useCartCalc();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        object: any,
        type?: string
    ) => {
        const values = { ...formValues };
        let { name, value } = e.target;
        object[name] = value;

        if (type === 'contact') {
            values.contact = object;
        } else if (type === 'address') {
            values.address = object;
        } else if (type === 'phoneNumber') {
            value = value.replace(/[^0-9]/g, '');
            values.contact.phoneNumber = value;
        } else if (type === 'pickUp') {
            values.deliveryType = 'PICKUP';
            setIsPickUp(true);
        } else if (type === 'courier') {
            values.deliveryType = 'COURIER';
            setIsPickUp(false);
        } else if (type === 'sooner') {
            values.deliveryTimeType = 'SOONER';
            setIsScheduledOrder(false);
        } else if (type === 'scheduled') {
            values.deliveryTimeType = 'SCHEDULED';
            setIsScheduledOrder(true);
        } else if (type === 'delivery-day') {
            values.deliveryTime = dayjs(value).toDate();
        } else if (type === 'delivery-time') {
            const time = dayjs(value);
            values.deliveryTime = dayjs(values.deliveryTime).hour(time.hour()).minute(time.minute()).toDate();
        } else {
            // @ts-ignore
            values[name] = value;
        }
        setValidationErrors(copyObject(initialCheckoutValidationErrors));
        setFormValues(values);
    };

    const validate = (values: IOrder): CheckoutValidationReturn => {
        let hasErrors = false;

        const errors: CheckoutValidationErrors = copyObject(initialCheckoutValidationErrors);

        if (!values.contact.customerName) {
            hasErrors = true;
            errors.contact.customerName = t.validationErrors.requiredName;
        }

        if (!values.contact.phoneNumber) {
            hasErrors = true;
            errors.contact.phoneNumber = t.validationErrors.requiredPhone;
        }

        if (values.contact.phoneNumber && values.contact.phoneNumber.length < 8) {
            hasErrors = true;
            errors.contact.phoneNumber = t.validationErrors.invalidLengthPhone;
        }

        if (!values.address?.city && values.deliveryType === 'COURIER') {
            hasErrors = true;
            errors.address!.city = t.validationErrors.requiredCity;
        }

        if (!values.address?.street && values.deliveryType === 'COURIER') {
            hasErrors = true;
            errors.address!.street = t.validationErrors.requiredStreet;
        }

        if (!values.address!.houseNumber && values.deliveryType === 'COURIER') {
            hasErrors = true;
            errors.address!.houseNumber = t.validationErrors.requiredHouseNumber;
        }

        if (!values.address!.apartment && values.deliveryType === 'COURIER') {
            hasErrors = true;
            errors.address!.apartment = t.validationErrors.requiredApartment;
        }

        if (values.contact.email) {
            const regExp = /\S+@\S+\.\S+/;

            if (!values.contact.email.match(regExp)) {
                errors.contact.email = t.validationErrors.invalidEmail;
            }
        }

        setValidationErrors(errors);

        return { hasErrors, errors };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const copy = {
            ...formValues,
            contact: { ...formValues.contact, phoneNumber: `+373${formValues.contact.phoneNumber}` },
        };

        const { hasErrors, errors } = validate(formValues);

        if (!hasErrors) {
            const order: IOrder = {
                orderTime: dayjs().toDate(),
                contact: { ...formValues.contact, phoneNumber: `+373${formValues.contact.phoneNumber}` },
                address: formValues.deliveryType === 'COURIER' ? formValues.address : undefined,
                deliveryType: formValues.deliveryType,
                deliveryTime: formValues.deliveryTimeType === 'SCHEDULED' ? formValues.deliveryTime : undefined,
                deliveryTimeType: formValues.deliveryTimeType,
                paymentMethod: formValues.paymentMethod,
                items: mapCartItemsToOrderItems(cart.items),
                subtotal,
                deliveryCost,
                total,
                comment: formValues.comment,
            };

            const [error, data] = await poster(`${process.env.NEXT_PUBLIC_API_URL}/orders`, order);
        } else {
            console.log('Errors: ', errors);
        }
    };

    return (
        <form className="mb-11" autoComplete="off" onSubmit={handleSubmit}>
            <ContactInfo errors={validationErrors} formValues={formValues} handleChange={handleChange} />
            <DeliveryType formValues={formValues} handleChange={handleChange} />
            <Address
                errors={validationErrors}
                formValues={formValues}
                handleChange={handleChange}
                isPickUp={isPickUp}
            />
            <DeliveryTime formValues={formValues} handleChange={handleChange} isScheduledOrder={isScheduledOrder} />
            <PaymentMethod formValues={formValues} handleChange={handleChange} />
            <Comment formValues={formValues} handleChange={handleChange} />
            <button
                type="submit"
                className="rounded-full w-1/2 bg-vp_brown-100 hover:bg-vp_brown-200 transition-all text-white py-2 mt-2 font-medium text-sm uppercase"
            >
                {t.order}
            </button>
        </form>
    );
};

export default CheckoutForm;
