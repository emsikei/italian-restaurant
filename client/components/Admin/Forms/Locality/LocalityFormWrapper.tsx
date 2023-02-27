import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FormType } from '../../../../constants';
import { copyObject } from '../../../../helpers';
import { poster, putter } from '../../../../lib/fetcher';
import { initialLocalityValidationErrors } from '../../../../states/admin';
import { RequestError } from '../../../../types/errors';
import { ILocality } from '../../../../types/locality';
import { LocalityValidationErrors, LocalityValidationReturn } from '../../../../types/validation';
import { Save } from '../../Buttons';
import LocalityForm from './LocalityForm';

interface ILocalityFormWrapperProps {
    localities: ILocality[];
    setLocalities: Dispatch<SetStateAction<ILocality[]>>;
    locality: ILocality;
    formType: FormType;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    requestError: string | RequestError;
    setRequestError: Dispatch<SetStateAction<string | RequestError>>;
}

const LocalityFormWrapper = ({
    localities,
    setLocalities,
    locality,
    formType,
    setModalActive,
    requestError,
    setRequestError,
}: ILocalityFormWrapperProps) => {
    const [formValues, setFormValues] = useState<ILocality>(locality);
    const [validationErrors, setValidationErrors] = useState<LocalityValidationErrors>(initialLocalityValidationErrors);
    const [validationErrorExist, setValidationErrorExist] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => {
        const values = { ...formValues };
        let { name, value } = e.target;

        // @ts-ignore
        values[name] = value;

        if (type === 'deliveryCost') {
            value = value.replace(/[^0-9]/g, '');
            values.deliveryCost = +value;
        }

        setValidationErrors(initialLocalityValidationErrors);
        setFormValues(values);
    };

    const validate = (values: ILocality): LocalityValidationReturn => {
        let hasErrors = false;

        const errors: LocalityValidationErrors = copyObject(initialLocalityValidationErrors);

        if (!values.name) {
            errors.name = 'Numele localității este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.deliveryCost) {
            errors.deliveryCost = 'Prețul livrării este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        setValidationErrors(errors);
        setRequestError('');

        return { hasErrors, errors };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { hasErrors, errors } = validate(formValues);

        if (!hasErrors) {
            if (formType === 'create') {
                const payload: ILocality = {
                    name: formValues.name,
                    deliveryCost: formValues.deliveryCost,
                };

                const [error, data] = await poster<ILocality>(`${process.env.NEXT_PUBLIC_API_URL}/localities`, payload);

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    setLocalities([data as ILocality, ...localities]);
                    setModalActive(false);
                }
            } else {
                const payload: ILocality = {
                    _id: formValues._id,
                    name: formValues.name,
                    deliveryCost: formValues.deliveryCost,
                };

                const [error, data] = await putter<ILocality>(`${process.env.NEXT_PUBLIC_API_URL}/localities`, payload);

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    const arr = [...localities];
                    const index = arr.findIndex((l) => l._id === data?._id);
                    arr[index] = data as ILocality;

                    setLocalities(arr);
                    setModalActive(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mt-5 mb-4">
                <LocalityForm formValues={formValues} handleChange={handleChange} errors={validationErrors} />
            </div>
            <Save />
            <p className="ml-1 mt-2 text-xs text-red-500">{requestError && JSON.stringify(requestError)}</p>
        </form>
    );
};

export default LocalityFormWrapper;
