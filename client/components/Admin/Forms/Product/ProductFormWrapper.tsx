import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FormType } from '../../../../constants';
import { copyObject, isCategoryEmpty } from '../../../../helpers';
import { poster, putter } from '../../../../lib/fetcher';
import { initialProductValidationErrors } from '../../../../states/admin';
import { ICategory } from '../../../../types/category';
import { RequestError } from '../../../../types/errors';
import { IProduct, ProductCreate } from '../../../../types/product';
import { ISize } from '../../../../types/size';
import { ProductValidationErrors, ProductValidationReturn } from '../../../../types/validation';
import { Save } from '../../Buttons';
import FormLangSwither from '../FormLangSwitcher';
import ProductForm from './ProductForm';

interface IProductFormWrapperPops {
    products: IProduct[];
    setProducts: Dispatch<SetStateAction<IProduct[]>>;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    formType: FormType;
    product: IProduct;
    sizes: ISize[];
    categories: ICategory[];
    recommendedProducts: IProduct[];
    requestError: string | RequestError;
    setRequestError: Dispatch<SetStateAction<string | RequestError>>;
}

const ProductFormWrapper = ({
    products,
    setProducts,
    setModalActive,
    formType,
    product,
    sizes,
    categories,
    recommendedProducts,
    requestError,
    setRequestError,
}: IProductFormWrapperPops) => {
    const [formValues, setFormValues] = useState<IProduct>(product);
    const [validationErrors, setValidationErrors] = useState<ProductValidationErrors>(
        copyObject(initialProductValidationErrors)
    );
    const [validationErrorExist, setValidationErrorExist] = useState<boolean>(false);
    const [currentFormLang, setCurrentFormLang] = useState<string>('ro');

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        object: any,
        type?: string,
        index?: number
    ) => {
        const values = { ...formValues };
        let { name, value } = e.target;

        object[name] = value;

        if (type === 'translations-ro') {
            values.translations.ro = object;
        } else if (type === 'translations-ru') {
            values.translations.ru = object;
        } else if (type === 'translations-en') {
            values.translations.en = object;
        } else if (type === 'discount') {
            value = value.replace(/[^0-9]/g, '');
            values.discount = +value;
        } else if (type === 'category') {
            const categoryId = e.target.value;
            const category = categories.find((c) => c._id === categoryId);
            values.category = category as ICategory;
        } else if (type === 'defaultPriceAndSize') {
            const json = JSON.parse(value);
            values.defaultPriceAndSize = json;
        } else if (type === 'price') {
            value = value.replace(/[^0-9]/g, '');
            if (
                values.pricesAndSizes[index as number].size._id === values.defaultPriceAndSize?.size._id &&
                values.pricesAndSizes[index as number].price === values.defaultPriceAndSize?.price
            ) {
                values.defaultPriceAndSize.price = +value;
            }

            values.pricesAndSizes[index as number].price = +value;
        } else if (type === 'size') {
            values.pricesAndSizes[index as number].size = JSON.parse(value);
        } else if (type === 'status') {
            // @ts-ignore
            values.status[name] = !values.status[name];
        } else if (type === 'recommendedProduct') {
            values.recommendedProducts[index as number] = JSON.parse(value);
        } else if (type === 'image') {
            // @ts-ignore
            const { files } = e.target;

            if (files!.length < 1) return;

            const url: string = URL.createObjectURL(files![0]);

            // eslint-disable-next-line prefer-destructuring
            values.imageLocal = files![0];
            values.imageLocalUrl = url;
        } else {
            // @ts-ignore
            values[name] = value;
        }

        setValidationErrors(copyObject(initialProductValidationErrors));
        setValidationErrorExist(false);
        setFormValues(values);
    };

    const validate = (values: IProduct): ProductValidationReturn => {
        let hasErrors = false;

        const errors: ProductValidationErrors = copyObject(initialProductValidationErrors);

        if (!values.translations.ro.name) {
            errors.translations.ro.name = 'RO: Numele produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.ru.name) {
            errors.translations.ru.name = 'RU: Numele produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.en.name) {
            errors.translations.en.name = 'EN: Numele produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.ro.description) {
            errors.translations.ro.description = 'RO: Descripția produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.ru.description) {
            errors.translations.ru.description = 'RU: Descripția produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.translations.en.description) {
            errors.translations.en.description = 'EN: Descripția produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.category) {
            errors.category = 'Categoria produsului este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.defaultPriceAndSize) {
            errors.defaultPriceAndSize = 'Prețul - mărimea este obligatoriu!';
            hasErrors = true;
            setValidationErrorExist(true);
        }

        if (!values.imageLocal && formType === 'create') {
            errors.image = 'Imaginea produsului este obligatoriu';
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
                const payload = {
                    translations: formValues.translations,
                    category: !isCategoryEmpty(formValues.category) ? formValues.category._id : categories[0]._id,
                    pricesAndSizes: formValues.pricesAndSizes,
                    defaultPriceAndSize: formValues.defaultPriceAndSize,
                    discount: formValues.discount,
                    recommendedProducts: formValues.recommendedProducts,
                    status: formValues.status,
                };

                const formData = new FormData();
                formData.append('product', JSON.stringify(payload));
                formData.append('image', formValues.imageLocal as Blob);

                const [error, data] = await poster<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData);

                if (error) setRequestError(error);

                if (!error) {
                    setProducts([data as IProduct, ...products]);
                    setModalActive(false);
                }
            } else {
                const payload = {
                    _id: formValues._id,
                    translations: formValues.translations,
                    category: formValues.category._id,
                    pricesAndSizes: formValues.pricesAndSizes,
                    defaultPriceAndSize: formValues.defaultPriceAndSize,
                    discount: formValues.discount,
                    recommendedProducts: formValues.recommendedProducts,
                    status: formValues.status,
                    publicId: formValues.publicId,
                    imageUrl: formValues.imageUrl,
                };

                const formData = new FormData();
                formData.append('product', JSON.stringify(payload));
                formData.append('image', formValues.imageLocal as Blob);

                const [error, data] = await putter<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/products`, formData);

                if (error) setRequestError(error);

                if (!error) {
                    const arr = [...products];
                    const index = arr.findIndex((p) => p._id === data?._id);
                    arr[index] = data as IProduct;

                    setProducts(arr);
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
                    <ProductForm
                        lang="ro"
                        formType={formType}
                        sizes={sizes}
                        categories={categories}
                        recommendedProducts={recommendedProducts}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={handleChange}
                        errors={validationErrors}
                    />
                )}
                {currentFormLang === 'ru' && (
                    <ProductForm
                        lang="ru"
                        formType={formType}
                        sizes={sizes}
                        categories={categories}
                        recommendedProducts={recommendedProducts}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={handleChange}
                        errors={validationErrors}
                    />
                )}
                {currentFormLang === 'en' && (
                    <ProductForm
                        lang="en"
                        formType={formType}
                        sizes={sizes}
                        categories={categories}
                        recommendedProducts={recommendedProducts}
                        formValues={formValues}
                        setFormValues={setFormValues}
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

export default ProductFormWrapper;
