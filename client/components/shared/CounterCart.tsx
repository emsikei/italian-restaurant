/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction } from 'react';
import { BsBasket3 } from 'react-icons/bs';
import { useCart } from '../../contexts/cart.context';
import { ICategory } from '../../types/category';
import { IProduct } from '../../types/product';
import { SizeTranslations } from '../../types/size';
import CartPopUp from '../Cart/CartPopUp';

interface ICounterCartProps {
    width?: number;
    height?: number;
    product?: IProduct;
    productId?: string;
    mainIcon?: boolean;
    modalIcon?: boolean;
    quantity?: number;
    setQuantity?: Dispatch<SetStateAction<number>>;
    showCartPopUp?: boolean;
    setShowCartPopUp?: Dispatch<SetStateAction<boolean>>;
}

const CounterCart = ({
    width = 15,
    height = 15,
    product,
    productId,
    mainIcon,
    modalIcon,
    quantity = 1,
    setQuantity,
    showCartPopUp,
    setShowCartPopUp,
}: ICounterCartProps) => {
    const { addToCart, getOneQuantity, getAllQuantities } = useCart();

    const handleClick = () => {
        addToCart({
            _id: product!._id as string,
            translations: product!.translations,
            price: product && product?.discount ? product.discount : (product!.defaultPriceAndSize?.price as number),
            quantity,
            imageUrl: product!.imageUrl,
            metrics: product?.defaultPriceAndSize?.size.translations as SizeTranslations,
            category: product?.category as ICategory,
        });
        if (modalIcon) setQuantity!(1);
    };

    const handleShowPopUp = () => {
        setShowCartPopUp!(true);
    };

    return (
        <div className="relative">
            <div
                className="relative hover:cursor-pointer"
                onClick={product ? handleClick : setShowCartPopUp ? handleShowPopUp : undefined}
            >
                <div
                    className={`rounded-full bg-vp_brown-100 ${
                        width === 15 ? 'w-11 h-11' : 'w-9 h-9'
                    } flex justify-center items-center`}
                >
                    {/* <CartIcon width={width} height={height} /> */}
                    <BsBasket3 color="#fff" size={width} />
                    <div className="absolute -right-0.5 -top-0.5 bg-red-700 rounded-full text-white w-5 h-5 leading-5 text-xs text-center">
                        {mainIcon ? <>{getAllQuantities()}</> : <>{getOneQuantity(productId)}</>}
                    </div>
                </div>
            </div>
            {mainIcon && showCartPopUp && setShowCartPopUp && (
                <CartPopUp
                    showCartPopUp={showCartPopUp}
                    setShowCartPopUp={setShowCartPopUp as Dispatch<SetStateAction<boolean>>}
                />
            )}
        </div>
    );
};

export default CounterCart;
