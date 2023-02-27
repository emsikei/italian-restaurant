/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode, useState, createContext, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import { getItemFromLocalStorage, setItemLocalStorage } from '../helpers';
import useFetch from '../hooks/useFetch';
import { CartItem, ICart } from '../types/cart';
import { ILocality } from '../types/locality';

interface CartContext {
    cart: ICart;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    getOneQuantity: (id: string | undefined) => void;
    getAllQuantities: () => number;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    deliveryLocality: ILocality;
    setDeliveryLocality: Dispatch<SetStateAction<ILocality>>;
}

export const CartContextImpl = createContext<CartContext>(null!);

export function useCart() {
    return useContext(CartContextImpl);
}

interface Props {
    children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
    const defaultLocality: ILocality = {
        name: 'Chișinău',
        deliveryCost: 50,
    };

    const { data: localities } = useFetch<ILocality[]>([], `${process.env.NEXT_PUBLIC_API_URL}/localities`);

    const [cart, setCart] = useState<ICart>({ items: [] } as ICart);
    const [deliveryLocality, setDeliveryLocality] = useState<ILocality>({
        ...defaultLocality,
    });

    const getCapital = (): ILocality => {
        const capital = localities.find((item) => item.name === 'Chișinău' || item.name === 'Chisinau');

        if (!capital) return defaultLocality;

        return capital;
    };

    useEffect(() => {
        setCart((getItemFromLocalStorage<ICart>('cart') as ICart) ?? ({ items: [] } as ICart));
        setDeliveryLocality(getCapital());
    }, []);

    useEffect(() => {
        setItemLocalStorage('cart', cart);
    }, [cart]);

    const addToCart = (item: CartItem): void => {
        const index = cart.items.findIndex((i) => i._id === item._id);

        const cartCopy = { ...cart };

        if (index > -1) {
            cartCopy.items[index].quantity += item.quantity;
            setCart(cartCopy);
        } else {
            cartCopy.items.push(item);
            setCart(cartCopy);
        }
    };

    const removeFromCart = (id: string): void => {
        const cartCopy = { ...cart };
        const newItems = cart.items.filter((item) => item._id !== id);

        cartCopy.items = [...newItems];

        setCart(cartCopy);
    };

    const getOneQuantity = (id: string | undefined): number => {
        if (!id) return 0;

        const index = cart.items.findIndex((item) => item._id === id);

        if (index > -1) {
            return cart.items[index].quantity;
        }

        return 0;
    };

    const getAllQuantities = (): number => {
        let totalQuantities: number = 0;

        cart.items.forEach((item) => {
            totalQuantities += item.quantity;
        });

        return totalQuantities;
    };

    const increaseQuantity = (id: string): void => {
        const index = cart.items.findIndex((item) => item._id === id);

        const cartCopy = { ...cart };

        cartCopy.items[index].quantity += 1;

        setCart(cartCopy);
    };

    const decreaseQuantity = (id: string): void => {
        const index = cart.items.findIndex((item) => item._id === id);

        const cartCopy = { ...cart };

        if (cartCopy.items[index].quantity <= 1) {
            cartCopy.items[index].quantity = 1;
            setCart(cartCopy);
        } else {
            cartCopy.items[index].quantity -= 1;
            setCart(cartCopy);
        }
    };

    return (
        <CartContextImpl.Provider
            value={{
                cart,
                addToCart,
                getOneQuantity,
                getAllQuantities,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                deliveryLocality,
                setDeliveryLocality,
            }}
        >
            {children}
        </CartContextImpl.Provider>
    );
};
