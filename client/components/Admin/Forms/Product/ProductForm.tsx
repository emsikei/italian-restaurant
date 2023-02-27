import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Image from 'next/image';
import Select from 'react-select';
import { FormType, LANG_TABLE } from '../../../../constants';
import { generateUUID, isObjectEmpty } from '../../../../helpers';
import { ICategory } from '../../../../types/category';
import { IProduct, ProductCreate } from '../../../../types/product';
import { ISize } from '../../../../types/size';
import { ProductValidationErrors } from '../../../../types/validation';
import Checkbox from '../../../Form/Checkbox';
import Input from '../../../Form/Input';
import Label from '../../../Form/Label';
import PriceAndSize from './PriceAndSize';
import RecommendedProduct from './RecommendedProduct';

interface IProductFormProps {
    formType: FormType;
    sizes: ISize[];
    categories: ICategory[];
    recommendedProducts: IProduct[];
    formValues: IProduct;
    errors: ProductValidationErrors;
    lang: 'ro' | 'ru' | 'en';
    handleChange: (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        object: any,
        type?: string,
        index?: number
    ) => void;
    setFormValues: Dispatch<SetStateAction<IProduct>>;
}

const ProductForm = ({
    formType,
    lang,
    sizes,
    categories,
    recommendedProducts,
    formValues,
    errors,
    handleChange,
    setFormValues,
}: IProductFormProps) => {
    const filterSizes = (): ISize[] => {
        const existingSizesIds: string[] = [];

        formValues.pricesAndSizes.forEach((item) => existingSizesIds.push(item.size._id as string));

        const filteredSizes = sizes.filter((size) => !existingSizesIds.includes(size._id as string));

        return filteredSizes;
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <div className="w-[60%]">
            <Label text={`${LANG_TABLE[lang].admin.productName}:`} />
            <Input
                classes="py-3.5"
                value={formValues.translations[lang].name}
                placeholder={`${LANG_TABLE[lang].admin.productName}:`}
                name="name"
                error={errors.translations[lang].name}
                handleChange={(e) => handleChange(e, formValues.translations[lang], `translations-${lang}`)}
            />
            <Label text={LANG_TABLE[lang].admin.productDescription} />
            <Input
                classes="py-3.5"
                value={formValues.translations[lang].description}
                placeholder={LANG_TABLE[lang].admin.productDescription}
                name="description"
                error={errors.translations[lang].description}
                handleChange={(e) => handleChange(e, formValues.translations[lang], `translations-${lang}`)}
            />
            <Label text="Categoria produsului:" />
            {/* <select
                name="category"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                onChange={(e) => {
                    handleChange(e, formValues, 'category');
                    console.log(e.target.value);
                }}
                value={isObjectEmpty(formValues.category) ? JSON.stringify(formValues.category) : 'DEFAULT'}
            >
                <option value="DEFAULT" disabled>
                    Alegeți categorie
                </option>
                {categories.map((category, index) => (
                    <option value={JSON.stringify(category)} key={index + 15}>
                        {category.translations.ro.name}
                    </option>
                ))}
            </select> */}
            <select
                name="category"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                onChange={(e) => {
                    handleChange(e, formValues, 'category');
                }}
                value={formValues.category._id}
            >
                {/* <option value="DEFAULT" disabled>
                    Alegeți categorie
                </option> */}
                {categories.map((category, index) => (
                    <option value={category._id} key={category._id}>
                        {category.translations.ro.name}
                    </option>
                ))}
            </select>
            <p className="ml-1 mt-2 text-xs text-red-500">{errors.category}</p>

            <Label text="Reducerea, %:" />
            <Input
                classes="py-2"
                value={formValues.discount as number}
                placeholder="Reducerea, %"
                name="discount"
                handleChange={(e) => handleChange(e, formValues, 'discount')}
            />
            <Label text="Prețul și greutatea pentru produs cu livrare:" />
            <select
                name="defaultPriceAndSize"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100"
                onChange={(e) => {
                    handleChange(e, formValues, 'defaultPriceAndSize');
                }}
                value={formValues.defaultPriceAndSize ? JSON.stringify(formValues.defaultPriceAndSize) : 'DEFAULT'}
            >
                <option value="DEFAULT" disabled>
                    Alegeți prețul și mărimea
                </option>
                {formValues.pricesAndSizes.map((item, index) => (
                    <option value={JSON.stringify(item)} key={generateUUID()}>
                        {item.price} MDL - {item.size.translations.ro.value}
                    </option>
                ))}
            </select>
            <p className="ml-1 mt-2 text-xs text-red-500">{errors.defaultPriceAndSize}</p>

            <div className="flex items-center gap-2 mb-2">
                <Label text="Prețuri și greutățiile pentru produs:" classes="mb-0" />
                <button
                    type="button"
                    className="font-medium text-xs text-vp_brown-100 transition-all hover:text-vp_brown-200 flex items-center gap-2"
                    onClick={(e) => {
                        setFormValues({
                            ...formValues,
                            pricesAndSizes: [...formValues.pricesAndSizes, { size: filterSizes()[0], price: 0 }],
                        });
                    }}
                >
                    <span>
                        <BsPlusLg />
                    </span>
                    <span>Adaugă</span>
                </button>
            </div>
            <div className={`flex flex-col gap-2 ${!formValues.pricesAndSizes.length ? 'mb-0' : 'mb-2'}`}>
                {formValues.pricesAndSizes.map((comp, index) => (
                    <PriceAndSize
                        key={index + 11}
                        sizes={sizes}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        handleChange={handleChange}
                        index={index}
                    />
                ))}
            </div>

            <Label text="Starea produsului:" classes="mb-2" />
            <div className="flex items-center gap-2 mb-2">
                <Checkbox
                    name="onlineMenu"
                    label="Arată în online menu"
                    checked={formValues.status.onlineMenu}
                    handleChange={(e) => handleChange(e, formValues, 'status')}
                />

                <Checkbox
                    name="offlineMenu"
                    label="Arată în offline menu"
                    checked={formValues.status.offlineMenu}
                    handleChange={(e) => handleChange(e, formValues, 'status')}
                />
            </div>

            <div className="flex items-center gap-2 mb-3">
                <Label text="Produse recomandate:" classes="mb-0" />
                <button
                    type="button"
                    className="font-medium text-xs text-vp_brown-100 transition-all hover:text-vp_brown-200 flex items-center gap-2"
                    onClick={(e) => {
                        setFormValues({
                            ...formValues,
                            recommendedProducts: [...formValues.recommendedProducts, recommendedProducts[0]],
                        });
                    }}
                >
                    <span>
                        <BsPlusLg />
                    </span>
                    <span>Adaugă</span>
                </button>
            </div>

            {formValues.recommendedProducts.map((comp, index) => (
                <RecommendedProduct
                    key={index + 12}
                    recommendedProducts={recommendedProducts}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleChange={handleChange}
                    index={index}
                />
            ))}

            <Label text="Imaginea produsului:" />
            {formValues.imageUrl && (
                <img src={formValues.imageUrl} alt="uploaded product" className="max-w-full mb-3" />
            )}
            <div className="flex items-center mb-3">
                <label htmlFor="file-upload" className="flex items-center">
                    <FaCloudUploadAlt />
                    <span className="pl-2 mr-2">Alegeți imaginea:</span>
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="file-upload"
                    onChange={(e) => handleChange(e, formValues, 'image')}
                />
            </div>
            {formValues.imageLocalUrl && (
                <img src={formValues.imageLocalUrl} alt="uploaded product" className="max-w-full mb-3" />
            )}
            <p className="ml-1 mt-2 text-xs text-red-500">{errors.image}</p>
        </div>
    );
};

export default ProductForm;
