import { ChangeEvent, useEffect } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { IOrder } from '../../types/order';
import { CheckoutValidationErrors } from '../../types/validation';
import Input from '../Form/Input';
import Label from '../Form/Label';
import City from './City';

interface IAddressProps {
    isPickUp: boolean;
    errors: CheckoutValidationErrors;
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, object: any, type?: string) => void;
}

const Address = ({ isPickUp, errors, formValues, handleChange }: IAddressProps) => {
    const t = useTranslations();

    return (
        <div
            className={`${
                isPickUp
                    ? 'transition-all ease-in-out max-h-0 overflow-hidden'
                    : 'h-auto max-h-screen transition-all ease-in-out mb-3'
            }`}
        >
            <Label text={t.address} />
            <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-12 sm:col-span-6 lg:col-span-12">
                    <City handleChange={handleChange} formValues={formValues} errors={errors} />
                </div>
                <div className="col-span-12 sm:col-span-6 lg:col-span-12">
                    <Input
                        error={errors.address?.street}
                        placeholder={t.street}
                        name="street"
                        value={formValues.address?.street as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-6">
                    <Input
                        error={errors.address?.houseNumber}
                        placeholder={t.houseNumber}
                        name="houseNumber"
                        value={formValues.address?.houseNumber as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>
                <div className="col-span-6">
                    <Input
                        error={errors.address?.apartment}
                        placeholder={t.apartment}
                        name="apartment"
                        value={formValues.address?.apartment as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-4">
                    <Input
                        placeholder={t.entrance}
                        name="entrance"
                        value={formValues.address?.entrance as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Input
                        placeholder={t.floor}
                        name="floor"
                        value={formValues.address?.floor as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Input
                        placeholder={t.intercomCode}
                        name="intercomCode"
                        value={formValues.address?.intercomCode as string}
                        handleChange={(e) => handleChange(e, formValues.address, 'address')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Address;
