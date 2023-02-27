import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';
import { generateUUID } from '../../../../helpers';
import { IProduct, ProductCreate } from '../../../../types/product';
import { ISize } from '../../../../types/size';
import Input from '../../../Form/Input';

interface IPriceAndSizeProps {
    sizes: ISize[];
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

const PriceAndSize = ({ sizes, index, formValues, handleChange, setFormValues }: IPriceAndSizeProps) => {
    const removePriceAndSize = (priceAndSizeIndex: number): void => {
        const pricesAndSizes = [...formValues.pricesAndSizes];

        const isDefaultPriceAndSizeRemoved: boolean =
            formValues.defaultPriceAndSize?.price === pricesAndSizes[index].price &&
            formValues.defaultPriceAndSize?.size._id === pricesAndSizes[index].size._id;

        const filtered = pricesAndSizes.filter((item, i) => i !== priceAndSizeIndex);

        setFormValues({
            ...formValues,
            pricesAndSizes: filtered,
            defaultPriceAndSize: isDefaultPriceAndSizeRemoved ? filtered[0] : formValues.defaultPriceAndSize,
        });
    };

    return (
        <div className="flex items-center">
            <Input
                name="price"
                placeholder="Prețul, MDL"
                value={formValues.pricesAndSizes[index].price}
                handleChange={(e) => handleChange(e, formValues, 'price', index)}
            />
            <select
                name="size"
                className="bg-white w-full rounded-lg pl-2 py-2 border-2 border-neutral-400 text-sm md:text-md focus:border-vp_brown-100 mr-2"
                onChange={(e) => {
                    handleChange(e, formValues, 'size', index);
                }}
                value={JSON.stringify(formValues.pricesAndSizes[index].size)}
            >
                {sizes.map((size) => (
                    <option value={JSON.stringify(size)} key={generateUUID()}>
                        {size.translations.ro.value}
                    </option>
                ))}
            </select>
            <button
                type="button"
                className="text-white bg-red-500 p-1 rounded-md transition-all hover:bg-red-600"
                onClick={() => removePriceAndSize(index)}
            >
                <span>
                    <IoMdClose />
                </span>
            </button>
        </div>
    );
};
export default PriceAndSize;
