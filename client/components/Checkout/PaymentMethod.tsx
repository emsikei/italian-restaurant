import { ChangeEvent } from 'react';
import RadioButton from '../Form/RadioButton';
import Label from '../Form/Label';
import { IOrder } from '../../types/order';
import useTranslations from '../../hooks/useTranslations';

interface IPaymentMethodProps {
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const PaymentMethod = ({ formValues, handleChange }: IPaymentMethodProps) => {
    const t = useTranslations();

    return (
        <div className="mb-2">
            <Label text={t.paymentMethod} />

            <div className="grid grid-cols-12 lg:block lg:grid-cols-none">
                <div className="col-span-12 sm:col-span-6 lg:col-span-12 sm:mr-2 lg:mr-0">
                    <RadioButton
                        id="payment-method-1"
                        name="paymentMethod"
                        text={t.cash}
                        value="CASH"
                        checked={formValues.paymentMethod === 'CASH'}
                        handleChange={(e) => handleChange(e, formValues)}
                    />
                </div>
                {/* <div className="col-span-12 sm:col-span-6 lg:col-span-12">
                    <RadioButton
                        id="payment-method-2"
                        name="paymentMethod"
                        text="Plata cu cardul la curier"
                        value="CARD_COURIER"
                        handleChange={(e) => handleChange(e, formValues)}
                        checked={formValues.paymentMethod === 'CARD_COURIER'}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default PaymentMethod;
