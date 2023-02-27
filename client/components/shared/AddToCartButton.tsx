import { Dispatch, SetStateAction } from 'react';
import { useCart } from '../../contexts/cart.context';
import { IProduct } from '../../types/product';
import { SizeTranslations } from '../../types/size';

interface IAddToCartButtonProps {
    quantity?: number;
    setQuantity?: Dispatch<SetStateAction<number>>;
    product: IProduct;
}

const AddToCartButton = ({ product, quantity, setQuantity }: IAddToCartButtonProps) => {
    const { addToCart } = useCart();

    const handleClick = () => {
        addToCart({
            _id: product!._id as string,
            translations: product!.translations,
            price: product && product?.discount ? product.discount : (product.defaultPriceAndSize?.price as number),
            quantity: quantity || 1,
            metrics: product.defaultPriceAndSize?.size.translations as SizeTranslations,
            imageUrl: product.imageUrl,
            category: product.category,
        });
        if (quantity) setQuantity!(1);
    };

    return (
        <button
            type="button"
            className="outline-none border-none focus:ring-0 bg-vp_brown-100 hover:bg-vp_brown-200 transition-all ease-in-out rounded-2xl py-1 px-5 text-white"
            onClick={handleClick}
        >
            În coș
        </button>
    );
};

export default AddToCartButton;
