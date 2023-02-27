import { BsBasket3 } from 'react-icons/bs';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useState } from 'react';
import useCartTotal from '../../hooks/useCartCalc';
import Cart from '../Cart/Cart';
import useTranslations from '../../hooks/useTranslations';
import { useCart } from '../../contexts/cart.context';

const MobileCart = () => {
    const [showCart, setShowCart] = useState<boolean>(false);

    const { cart } = useCart();
    const { total } = useCartTotal();
    const t = useTranslations();

    const handleClick = () => {
        setShowCart(!showCart);
    };

    return (
        <section>
            <section className="lg:hidden col-span-12 py-3 border-b-2 border-neutral-400 mb-3">
                <div className="flex justify-between items-center text-md">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <BsBasket3 />
                        <button type="button" className="flex items-center gap-2" onClick={handleClick}>
                            {t.checkCart}
                            {showCart ? <AiOutlineUp size={13} /> : <AiOutlineDown size={13} />}
                        </button>
                    </div>
                    {cart.items.length > 0 ? <span>{total} MDL</span> : <span>0 MDL</span>}
                </div>
            </section>
            <section
                className={`${
                    showCart
                        ? 'h-auto max-h-screen transition-all ease-in-out md:hidden'
                        : 'transition-all ease-in-out max-h-0 overflow-hidden md:hidden'
                }`}
            >
                <Cart type="checkout" />
            </section>
        </section>
    );
};

export default MobileCart;
