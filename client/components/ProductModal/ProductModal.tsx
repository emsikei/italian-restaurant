/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CounterCart from '../shared/CounterCart';

import ProductModalSlider from '../Sliders/ModalProductSlider';
import { IProduct } from '../../types/product';
import { calculatePriceWithDiscount } from '../../helpers';
import { useLocale } from '../../contexts/locale.context';
import { LocaleType } from '../../types/locale';
import useTranslations from '../../hooks/useTranslations';
import AddToCartButton from '../shared/AddToCartButton';

interface IProductModalProps {
    product?: IProduct;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ProductModal = ({ showModal, product, setShowModal }: IProductModalProps) => {
    const [quantity, setQuantity] = useState<number>(1);

    const { locale } = useLocale();
    const t = useTranslations();

    const increaseQuantity = (): void => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = (): void => {
        if (quantity <= 1) {
            setQuantity(1);
            return;
        }

        setQuantity(quantity - 1);
    };

    return (
        <div
            className={`${
                showModal ? 'opacity-1' : 'opacity-0 pointer-events-none'
            } fixed left-0 top-0 z-50 w-screen h-screen bg-black/75 flex justify-center items-center flex-col md:flex-row transition-all overflow-y-scroll`}
            onClick={() => setShowModal(false)}
        >
            <div
                className={`bg-white dark:bg-black dark:text-white w-screen md:w-4/6 h-5/6 lg:grid lg:grid-cols-12 rounded-xl p-2 gap-5 pt-11 relative ${
                    showModal ? 'scale-1' : 'scale-50'
                } transition-all overflow-y-scroll`}
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className="absolute z-30 top-2 right-2 w-6 h-6 rounded-full text-center hover:cursor-pointer flex justify-center items-center"
                    onClick={() => setShowModal(false)}
                >
                    <AiOutlineClose size={25} />
                </span>
                <div className="block w-full h-auto lg:col-span-6 relative rounded-xl lg:flex lg:items-center">
                    {product && (
                        <div className="w-full h-full lg:h-auto">
                            <Image
                                src={product?.imageUrl as string}
                                alt="Pizza"
                                width={500}
                                height={500}
                                layout="responsive"
                                className="lg:scale-125"
                                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}
                </div>
                <div className="lg:col-span-6 px-4 lg:px-11 h-auto">
                    <div className="mb-5">
                        <h3 className="font-medium text-md sm:text-lg md:text-xl">
                            {product?.translations[locale as LocaleType].name}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-white mb-5">
                            {product?.defaultPriceAndSize?.size.translations[locale as LocaleType].value}
                        </p>
                        <p className="text-xs sm:text-sm">{product?.translations[locale as LocaleType].description} </p>
                    </div>
                    <div className="flex items-center mb-5 flex-wrap gap-3">
                        {product?.discount ? (
                            <div className="flex mr-8 text-sm md:text-md">
                                <span className="font-bold relative block text-neutral-600  dark:text-white line-through mr-10 text-sm md:text-md">
                                    {product?.defaultPriceAndSize?.price}
                                    <span className="pl-1 absolute top-0 left-full inline-block text-xs">MDL</span>
                                </span>
                                <span className="font-bold relative block text-rose-600 text-sm md:text-md">
                                    {calculatePriceWithDiscount(
                                        product!.defaultPriceAndSize?.price as number,
                                        product!.discount
                                    )}
                                    <span className="pl-1 absolute top-0 left-full inline-block text-xs">MDL</span>
                                </span>
                            </div>
                        ) : (
                            <span className="font-bold text-md relative block text-xs sm:text-sm md:text-md mr-8">
                                {product?.defaultPriceAndSize?.price}
                                <span className="pl-1 absolute top-0 left-full text-sm inline-block">MDL</span>
                            </span>
                        )}
                        <div className="flex">
                            <div className="flex mr-2.5 items-center rounded-full border border-vp_brown-100 px-3.5 text-xs">
                                <button type="button" onClick={decreaseQuantity}>
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button type="button" onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                            <AddToCartButton
                                quantity={quantity}
                                setQuantity={setQuantity}
                                product={product as IProduct}
                            />
                        </div>
                    </div>
                    {(product?.recommendedProducts.length as number) > 0 && (
                        <>
                            <h3 className="text-md sm:text-lg md:text-xl text-neutral-600 dark:text-white font-medium mb-2">
                                {t.recommendedPositions}
                            </h3>
                            <ProductModalSlider id="633c8cd6530d8945c4096980" products={product?.recommendedProducts} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
