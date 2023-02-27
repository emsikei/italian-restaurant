import { ChangeEvent } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { IOrder } from '../../types/order';
import { CheckoutValidationErrors } from '../../types/validation';
import Label from '../Form/Label';
import RadioButton from '../Form/RadioButton';

interface IDeliveryTypeProps {
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const DeliveryType = ({ formValues, handleChange }: IDeliveryTypeProps) => {
    const t = useTranslations();

    return (
        <div className="mb-2">
            <Label text={t.deliveryType} />

            <div className="grid grid-cols-12 lg:block lg:grid-cols-none">
                <div className="col-span-12 sm:col-span-6 lg:col-span-12 sm:mr-2 lg:mr-0">
                    <RadioButton
                        id="delivery-2"
                        text={t.delivery}
                        value="COURIER"
                        name="deliveryType"
                        handleChange={(e) => handleChange(e, formValues, 'courier')}
                        checked={formValues.deliveryType === 'COURIER'}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-12">
                    <RadioButton
                        id="delivery-1"
                        text={t.pickUp}
                        value="PICKUP"
                        name="deliveryType"
                        handleChange={(e) => handleChange(e, formValues, 'pickUp')}
                        checked={formValues.deliveryType === 'PICKUP'}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeliveryType;
