import { ChangeEvent, useState } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { IOrder } from '../../types/order';
import { CheckoutValidationErrors } from '../../types/validation';
import Input from '../Form/Input';
import Label from '../Form/Label';

interface IContactInfoProps {
    errors: CheckoutValidationErrors;
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const ContactInfo = ({ errors, formValues, handleChange }: IContactInfoProps) => {
    const t = useTranslations();

    return (
        <div className="mb-3 lg:mt-3">
            <Label text={t.contactInfo} />
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 sm:col-span-4">
                    <Input
                        error={errors.contact.customerName}
                        placeholder={t.fullName}
                        name="customerName"
                        value={formValues.contact.customerName}
                        handleChange={(e) => handleChange(e, formValues.contact, 'contact')}
                    />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Input
                        error={errors.contact.email}
                        placeholder={t.email}
                        name="email"
                        value={formValues.contact.email as string}
                        handleChange={(e) => handleChange(e, formValues.contact, 'contact')}
                    />
                </div>

                <div className="col-span-12 sm:col-span-4">
                    <Input
                        error={errors.contact.phoneNumber}
                        placeholder="78878878*"
                        name="phoneNumber"
                        value={formValues.contact.phoneNumber}
                        handleChange={(e) => handleChange(e, formValues.contact, 'phoneNumber')}
                        maxlength={8}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
