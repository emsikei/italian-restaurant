/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useState } from 'react';
import Image from 'next/image';

import CounterCart from '../shared/CounterCart';
import DescriptionBox from '../Menu/DescriptionBox';
import { IProduct } from '../../types/product';
import { MoreInfoIcon } from '../../svg/icons';
import { calculatePriceWithDiscount } from '../../helpers';
import { useLocale } from '../../contexts/locale.context';
import { LocaleType } from '../../types/locale';
import AddToCartButton from '../shared/AddToCartButton';

interface IProductCardProps {
    product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
    const [showBox, setShowBox] = useState<boolean>(false);
    const { locale } = useLocale();

    return (
        <div
            key={product._id}
            className="overflow-hidden rounded-xl transition-all duration-200 hover:shadow-xl border"
        >
            <div className="w-full relative flex justify-center">
                <div className="w-full flex items-center justify-center">
                    <img
                        src={product?.imageUrl as string}
                        className="img-card"
                        alt={product.translations[locale as LocaleType].name}
                    />
                </div>
                <DescriptionBox
                    text={product.translations[locale as LocaleType].description}
                    showBox={showBox}
                    setShowBox={setShowBox}
                />
            </div>
            <div className="px-3 py-2 bg-white dark:bg-black dark:text-white">
                <div className="flex justify-between">
                    <h3 className="text-md sm:text-lg text-ellipsis overflow-hidden whitespace-nowrap">
                        {product.translations[locale as LocaleType].name}
                    </h3>
                    {!showBox && (
                        <button type="button" onClick={() => setShowBox(true)}>
                            <MoreInfoIcon />
                        </button>
                    )}
                </div>
                <p className="text-xs text-zinc-700 dark:text-white mb-5">
                    {product.defaultPriceAndSize?.size.translations[locale as LocaleType].value}
                </p>
                <div className="flex justify-between items-center">
                    {product.discount ? (
                        <div className="mr-16 text-sm md:text-md ">
                            <span className="font-bold relative block text-neutral-600 dark:text-white line-through">
                                {product?.defaultPriceAndSize?.price}
                                <span className="pl-1 absolute top-0 left-full text-xs inline-block">MDL</span>
                            </span>
                            <span className="font-bold relative block text-rose-600">
                                {calculatePriceWithDiscount(
                                    product!.defaultPriceAndSize?.price as number,
                                    product!.discount
                                )}
                                <span className="pl-1 absolute top-0 left-full text-xs inline-block">MDL</span>
                            </span>
                        </div>
                    ) : (
                        <span className="font-bold text-sm md:text-md relative block dark:text-white pb-5">
                            {product.defaultPriceAndSize?.price}
                            <span className="pl-1 absolute top-0 left-full text-xs inline-block">MDL</span>
                        </span>
                    )}
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
