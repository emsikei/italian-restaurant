import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { ICategory } from '../../../../types/category';
import { Save } from '../../Buttons';
import CategoryForm from './CategoryForm';
import FormLangSwither from '../FormLangSwitcher';
import { CategoryValidationErrors, CategoryValidationReturn } from '../../../../types/validation';
import { initialCategoryValidationErrors } from '../../../../states/admin';
import { copyObject } from '../../../../helpers';
import { FormType } from '../../../../constants';
import { poster, putter } from '../../../../lib/fetcher';
import { RequestError } from '../../../../types/errors';

interface ICategoryFormWrapperProps {
    categories: ICategory[];
    setCategories: Dispatch<SetStateAction<ICategory[]>>;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    category: ICategory;
    formType: FormType;
    requestError: string | RequestError;
    setRequestError: Dispatch<SetStateAction<string | RequestError>>;
}

const CategoryFormWrapper = ({
    categories,
    setCategories,
    setModalActive,
    category,
    formType,
    requestError,
    setRequestError,
}: ICategoryFormWrapperProps) => {
    const [formValues, setFormValues] = useState<ICategory>(category);
    const [validationErrors, setValidationErrors] = useState<CategoryValidationErrors>(initialCategoryValidationErrors);
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

        setValidationErrors(copyObject(initialCategoryValidationErrors));
        setValidationErrorExist(false);
        setFormValues(values);
    };

    const validate = (values: ICategory): CategoryValidationReturn => {
        let hasErrors = false;

        const errors: CategoryValidationErrors = copyObject(initialCategoryValidationErrors);

        if (!values.translations.ro.name) {
            errors.translations.ro.name = 'RO: Numele categoriei este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.ru.name) {
            errors.translations.ru.name = 'RU: Numele categoriei este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.en.name) {
            errors.translations.en.name = 'EN: Numele categoriei este obligatoriu!';
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
                const payload: ICategory = {
                    translations: formValues.translations,
                };

                const [error, data] = await poster<ICategory>(`${process.env.NEXT_PUBLIC_API_URL}/categories`, payload);

                if (error) setRequestError(error);

                if (!error) {
                    setCategories([data as ICategory, ...categories]);
                    setModalActive(false);
                }
            } else {
                const payload: ICategory = {
                    _id: formValues?._id,
                    translations: formValues.translations,
                };

                const [error, data] = await putter<ICategory>(`${process.env.NEXT_PUBLIC_API_URL}/categories`, payload);

                if (error) setRequestError(error);

                if (!error) {
                    const arr = [...categories];
                    const index = arr.findIndex((s) => s._id === data?._id);
                    arr[index] = data as ICategory;

                    setCategories(arr);
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
                    <CategoryForm
                        lang="ro"
                        formValues={formValues}
                        handleChange={handleChange}
                        errors={validationErrors}
                    />
                )}
                {currentFormLang === 'ru' && (
                    <CategoryForm
                        lang="ru"
                        formValues={formValues}
                        handleChange={handleChange}
                        errors={validationErrors}
                    />
                )}
                {currentFormLang === 'en' && (
                    <CategoryForm
                        lang="en"
                        formValues={formValues}
                        handleChange={handleChange}
                        errors={validationErrors}
                    />
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

export default CategoryFormWrapper;
