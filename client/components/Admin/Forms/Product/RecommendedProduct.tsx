import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import { generateUUID } from '../../../../helpers';
import { IProduct, ProductCreate } from '../../../../types/product';

interface IRecommendedProductProps {
    recommendedProducts: IProduct[];
    index: number;
    handleChange: (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        object: any,
        type?: string,
        index?: number
    ) => void;
    formValues: IProduct;
    setFormValues: Dispatch<SetStateAction<IProduct>>;
}

const RecommendedProduct = ({
    index,
    handleChange,
    formValues,
    setFormValues,
    recommendedProducts,
}: IRecommendedProductProps) => {
    const removeRecommendedProduct = (productIndex: number): void => {
        const copyRecommendedProducts = [...formValues.recommendedProducts];

        const filtered = copyRecommendedProducts.filter((item, i) => i !== productIndex);

        setFormValues({
            ...formValues,
            recommendedProducts: filtered,
        });
    };

    return (
        <div className="flex items-center mb-2">
            <div className="w-24 h-16 relative">
                <Image
                    src={formValues.recommendedProducts[index]?.imageUrl as string}
                    layout="fill"
                    objectFit="scale-down"
                    alt={formValues.recommendedProducts[index].translations.ro.name ?? 'product'}
                />
            </div>
            <select
                name="recommendedProduct"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100 mr-2"
                onChange={(e) => {
                    handleChange(e, formValues, 'recommendedProduct', index);
                }}
                value={JSON.stringify(formValues.recommendedProducts[index])}
            >
                {recommendedProducts.map((product) => (
                    <option value={JSON.stringify(product)} key={generateUUID()}>
                        {product.translations.ro.name}
                    </option>
                ))}
            </select>
            <button
                type="button"
                className="text-white bg-red-500 p-1 rounded-md transition-all hover:bg-red-600"
                onClick={() => removeRecommendedProduct(index)}
            >
                <span>
                    <IoMdClose />
                </span>
            </button>
        </div>
    );
};

export default RecommendedProduct;
