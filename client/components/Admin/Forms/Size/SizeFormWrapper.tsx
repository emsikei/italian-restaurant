import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Save } from '../../Buttons';
import FormLangSwither from '../FormLangSwitcher';
import { SizeValidationErrors, SizeValidationReturn } from '../../../../types/validation';
import { initialSizeValidationErrors } from '../../../../states/admin';
import { copyObject } from '../../../../helpers';
import SizeForm from './SIzeForm';
import { ISize, SizeCreate } from '../../../../types/size';
import { FormType } from '../../../../constants';
import { poster, putter } from '../../../../lib/fetcher';
import { RequestError } from '../../../../types/errors';

interface ISizeFormWrapperProps {
    sizes: ISize[];
    setSizes: Dispatch<SetStateAction<ISize[]>>;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    formType: FormType;
    size: ISize;
    requestError: string | RequestError;
    setRequestError: Dispatch<SetStateAction<string | RequestError>>;
}

const SizeFormWrapper = ({
    sizes,
    setSizes,
    setModalActive,
    formType,
    size,
    requestError,
    setRequestError,
}: ISizeFormWrapperProps) => {
    const [formValues, setFormValues] = useState<ISize>(size);
    const [validationErrors, setValidationErrors] = useState<SizeValidationErrors>(initialSizeValidationErrors);
    const [validationErrorExist, setValidationErrorExist] = useState<boolean>(false);
    const [currentFormLang, setCurrentFormLang] = useState<string>('ro');

    const handleChange = (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => {
        const values = { ...formValues };
        const { name, value } = e.target;

        object[name] = value;

        if (type === 'translations-ro') {
            values.translations.ro = object;
        } else if (type === 'translations-ru') {
            values.translations.ru = object;
        } else if (type === 'translations-en') {
            values.translations.en = object;
        }

        setValidationErrors(copyObject(initialSizeValidationErrors));
        setValidationErrorExist(false);
        setFormValues(values);
    };

    const validate = (values: ISize | SizeCreate): SizeValidationReturn => {
        let hasErrors = false;

        const errors: SizeValidationErrors = copyObject(initialSizeValidationErrors);

        if (!values.translations.ro.value) {
            errors.translations.ro.value = 'RO: Valorea mărimii este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.ru.value) {
            errors.translations.ru.value = 'RU: Valorea mărimii este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.en.value) {
            errors.translations.en.value = 'EN: Valorea mărimii este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        setValidationErrors(errors);

        return { hasErrors, errors };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { hasErrors, errors } = validate(formValues);

        if (!hasErrors) {
            if (formType === 'create') {
                const payload: ISize = {
                    translations: formValues.translations,
                };

                const [error, data] = await poster<ISize>(`${process.env.NEXT_PUBLIC_API_URL}/sizes`, payload);

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    setSizes([data as ISize, ...sizes]);
                    setModalActive(false);
                }
            } else {
                const payload: ISize = {
                    _id: formValues?._id,
                    translations: formValues.translations,
                };

                const [error, data] = await putter<ISize>(`${process.env.NEXT_PUBLIC_API_URL}/sizes`, payload);

                if (error) {
                    setRequestError(error);
                }

                if (!error) {
                    const arr = [...sizes];
                    const index = arr.findIndex((s) => s._id === data?._id);
                    arr[index] = data as ISize;

                    setSizes(arr);
                    setModalActive(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <FormLangSwither currentFormLang={currentFormLang} setCurrentFormLang={setCurrentFormLang} />
            <div className="mt-5 mb-4">
                {currentFormLang === 'ro' && (
                    <SizeForm lang="ro" formValues={formValues} handleChange={handleChange} errors={validationErrors} />
                )}
                {currentFormLang === 'ru' && (
                    <SizeForm lang="ru" formValues={formValues} handleChange={handleChange} errors={validationErrors} />
                )}
                {currentFormLang === 'en' && (
                    <SizeForm lang="en" formValues={formValues} handleChange={handleChange} errors={validationErrors} />
                )}
            </div>
            <div className="flex items-center">
                <Save />
                {validationErrorExist && (
                    <p className="text-xs text-red-500 ml-3">Există erorile, verificați datele introduse!</p>
                )}
                <p className="ml-1 mt-2 text-xs text-red-500">{requestError && JSON.stringify(requestError)}</p>
            </div>
        </form>
    );
};

export default SizeFormWrapper;
