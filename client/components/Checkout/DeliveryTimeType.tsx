import { ChangeEvent } from 'react';
import RadioButton from '../Form/RadioButton';
import Label from '../Form/Label';
import { IOrder } from '../../types/order';
import useTranslations from '../../hooks/useTranslations';
import PickDeliveryTime from './PickDeliveryTime';

interface IDeliveryTimeProps {
    isScheduledOrder: boolean;
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, object: any, type?: string) => void;
}

const DeliveryTime = ({ isScheduledOrder, formValues, handleChange }: IDeliveryTimeProps) => {
    const t = useTranslations();

    return (
        <div className="mb-1 lg:mb-0">
            <Label text={t.deliveryTime} />
            <div className="grid grid-cols-12">
                <div className="col-span-12 sm:col-span-6 lg:col-span-12 sm:mr-2 lg:mr-0">
                    <RadioButton
                        id="delivery-time-1"
                        name="deliveryTime"
                        text={t.soon}
                        value="SOONER"
                        handleChange={(e) => handleChange(e, formValues, 'sooner')}
                        checked={formValues.deliveryTimeType === 'SOONER'}
                    />
                </div>
                {/* <div className="col-span-12 sm:col-span-6 lg:col-span-12  lg:mr-0">
                    <RadioButton
                        id="delivery-time-2"
                        name="deliveryTime"
                        text={t.atTime}
                        value="SCHEDULED"
                        handleChange={(e) => handleChange(e, formValues, 'scheduled')}
                        checked={formValues.deliveryTimeType === 'SCHEDULED'}
                    />
                    {isScheduledOrder && <PickDeliveryTime formValues={formValues} handleChange={handleChange} />}
                </div> */}
            </div>
        </div>
    );
};

export default DeliveryTime;
