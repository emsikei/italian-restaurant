import { ChangeEvent } from 'react';
import { ILocality } from '../../../../types/locality';
import { LocalityValidationErrors } from '../../../../types/validation';
import Input from '../../../Form/Input';
import Label from '../../../Form/Label';

interface ILocalityFormProps {
    errors: LocalityValidationErrors;
    formValues: ILocality;
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const LocalityForm = ({ errors, formValues, handleChange }: ILocalityFormProps) => (
    <div className="w-[50%]">
        <Label text="Numele localității" />
        <Input
            value={formValues.name}
            placeholder="Numele localității"
            name="name"
            error={errors.name}
            handleChange={(e) => handleChange(e, formValues.name)}
        />
        <Label text="Prețul livrării" />
        <Input
            value={formValues.deliveryCost}
            placeholder="Prețul livrării"
            name="deliveryCost"
            error={errors.deliveryCost}
            handleChange={(e) => handleChange(e, formValues.deliveryCost, 'deliveryCost')}
        />
    </div>
);
export default LocalityForm;
