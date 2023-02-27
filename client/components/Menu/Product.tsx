/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import DescriptionBox from './DescriptionBox';
import { IProduct } from '../../types/product';
import { calculatePriceWithDiscount } from '../../helpers';
import { LocaleType } from '../../types/locale';
import { useLocale } from '../../contexts/locale.context';

export interface IProductProps {
    product: IProduct;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setActiveProduct: Dispatch<SetStateAction<any>>;
}

const Product = ({ product, setShowModal, setActiveProduct }: IProductProps) => {
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const { locale } = useLocale();

    const handleClick = () => {
        setActiveProduct(product);
        setShowModal(true);
    };

    return (
        <div key={product._id} className="transition-all duration-200 hover:shadow-xl">
            <div className="relative flex justify-center bg-white rounded-t-xl cursor-pointer" onClick={handleClick}>
                <div className="block w-full">
                    <Image
                        src={product?.imageUrl as string}
                        alt={product.translations[locale as LocaleType].name}
                        width={500}
                        height={500}
                        layout="responsive"
                        priority
                        className=""
                    />
                </div>
                <DescriptionBox
                    text={product.translations[locale as LocaleType].description}
                    showBox={showDescription}
                    setShowBox={setShowDescription}
                />
            </div>
            <div className="px-3 pb-4 bg-white rounded-b-xl">
                <div className="flex justify-between">
                    <h3 className="text-md sm:text-lg md:text-xl font-medium dark:text-black text-ellipsis overflow-hidden whitespace-nowrap">
                        {product.translations[locale as LocaleType].name}
                    </h3>
                    {!showDescription && (
                        <button
                            type="button"
                            onClick={() => setShowDescription(true)}
                            aria-label="moreinfo-button"
                            className="outline-none border-none mr-0.5"
                        >
                            <AiOutlineInfoCircle color="#A5A7A9" />
                        </button>
                    )}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 mb-5">
                    {product.defaultPriceAndSize?.size.translations[locale as LocaleType].value}
                </p>
                <div className="flex justify-between items-center">
                    {product.discount ? (
                        <div className="flex sm:mr-16 text-sm md:text-md">
                            <span className="text-sm font-bold relative block text-neutral-600 line-through mr-10">
                                {product?.defaultPriceAndSize?.price}
                                <span className="pl-1 absolute top-0 left-full text-xs inline-block">MDL</span>
                            </span>
                            <span className="font-bold relative block text-rose-600 text-sm">
                                {calculatePriceWithDiscount(
                                    product!.defaultPriceAndSize?.price as number,
                                    product!.discount
                                )}
                                <span className="pl-1 absolute top-0 left-full text-xs inline-block">MDL</span>
                            </span>
                        </div>
                    ) : (
                        <span className="font-bold text-sm  relative block dark:text-black">
                            {product.defaultPriceAndSize?.price}
                            <span className="pl-1 absolute top-0 left-full text-sm inline-block">MDL</span>
                        </span>
                    )}
                    <button
                        type="button"
                        className="outline-none border-none focus:ring-0 bg-vp_brown-100 hover:bg-vp_brown-200 transition-all ease-in-out rounded-2xl py-1 px-3 text-white text-sm sm:text-base lg:text-xs"
                        onClick={handleClick}
                    >
                        În coș
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Product;
