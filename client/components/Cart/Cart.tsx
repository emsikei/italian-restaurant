/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import Link from 'next/link';
import { BsTrash } from 'react-icons/bs';
import { LocaleType } from '../../types/locale';
import { useCart } from '../../contexts/cart.context';
import { useLocale } from '../../contexts/locale.context';
import useCartCalc from '../../hooks/useCartCalc';
import useTranslations from '../../hooks/useTranslations';

interface ICartProps {
    type: 'checkout' | 'popup';
}

const Cart = ({ type }: ICartProps) => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { subtotal, deliveryCost, total } = useCartCalc();
    const { locale } = useLocale();
    const t = useTranslations();

    return cart.items.length > 0 ? (
        <>
            <h3
                className={`${
                    type === 'checkout'
                        ? 'hidden md:block font-bold text-sm md:text-xl mb-9 text-center relative after:absolute after:block after:h-0.5 after:bg-vp_brown-100 after:w-11/12 after:-bottom-2 pb-4 md:pb-9'
                        : 'font-bold text-sm md:text-xl mb-9 text-center relative after:absolute after:block after:h-0.5 after:bg-vp_brown-100 after:w-11/12 after:-bottom-2 pb-4 md:pb-9'
                }`}
            >
                {t.cart}
            </h3>
            <div id="cart_pop_up" className="overflow-y-auto max-h-72">
                {cart.items.map((item, index) => (
                    <div
                        key={index}
                        className="sm:flex items-center text-sm sm:pr-11 mb-8 relative before:absolute before:block before:h-0.5 before:bg-vp_brown-100 before:w-11/12 before:-bottom-3.5 pb-1"
                    >
                        <div className="w-full sm:w-44 h-44 relative mr-5 bg-transparent">
                            <Image
                                src={item?.imageUrl as string}
                                layout="fill"
                                alt={item.translations[locale as LocaleType].name}
                                objectFit="contain"
                                priority
                                className="w-full rounded-xl"
                            />
                        </div>
                        <div className="ml-5">
                            <div className="mb-3">
                                <h3 className="font-bold text-md md:text-xl">
                                    {item.translations[locale as LocaleType].name}
                                </h3>
                                <p className="text-xs md:text-sm">{item.metrics[locale as LocaleType].value}</p>
                            </div>
                            <span className="font-medium text-md md:text-lg relative block mb-3">
                                {item.price}
                                <span className="pl-1 absolute top-0 text-xs inline-block">MDL</span>
                            </span>
                            <div
                                className={`${type === 'checkout' ? 'text-xs flex items-center' : 'flex items-center'}`}
                            >
                                <div className="flex mr-2.5 items-center rounded-full border border-vp_brown-100 px-3.5 py-1 text-sm md:text-md">
                                    <button
                                        type="button"
                                        className="active:text-vp_brown-200 transition-all ease-in-out"
                                        onClick={() => {
                                            decreaseQuantity(item._id);
                                        }}
                                    >
                                        -
                                    </button>
                                    <span className="px-7">{item.quantity}</span>
                                    <button
                                        type="button"
                                        className="active:text-vp_brown-200 transition-all ease-in-out"
                                        onClick={() => {
                                            increaseQuantity(item._id);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <div
                                    className="border border-vp_brown-100 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    <BsTrash />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:pr-9 font-medium text-sm md:text-md text-vp_gray dark:text-white my-3 relative">
                <div
                    className={`flex justify-between items-center mb-3 ${
                        type === 'checkout' && 'border-t-2 border-neutral-400 pt-4'
                    }`}
                >
                    <p>{t.subtotal}</p>
                    <p>{subtotal} MDL</p>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <p>{t.deliveryCost}</p>
                    <p>{deliveryCost} MDL</p>
                </div>
                <div className="flex justify-between items-center text-md md:text-lg border-t-4 border-vp_gray pt-3">
                    <p className="uppercase">{t.total}</p>
                    <p>{total} MDL</p>
                </div>
            </div>
            {type === 'popup' && (
                <button
                    type="button"
                    className="rounded-full w-11/12 bg-vp_brown-100 hover:bg-vp_brown-200 transition-all text-white py-2"
                >
                    <Link href="/checkout">
                        <a className="uppercase">{t.checkout}</a>
                    </Link>
                </button>
            )}
        </>
    ) : (
        <h3 className={`h-15 text-center ${type === 'checkout' && 'mb-4'}`}>{t.cartEmpty}</h3>
    );
};

export default Cart;
