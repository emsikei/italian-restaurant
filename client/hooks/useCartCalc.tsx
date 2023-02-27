import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DELIVERY_FREE } from '../constants';
import { useCart } from '../contexts/cart.context';
import { calculateTotal } from '../helpers';

type T = {
    subtotal: number;
    deliveryCost: number;
    total: number;
    setTotal: Dispatch<SetStateAction<number>>;
};

export default function useCartCalc(): T {
    const { cart, deliveryLocality } = useCart();
    const [total, setTotal] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(calculateTotal(cart));
    const [deliveryCost, setDeliveryCost] = useState<number>(0);

    useEffect(() => {
        const res = calculateTotal(cart);

        if (res < DELIVERY_FREE) {
            setTotal(res + deliveryLocality.deliveryCost);
            setDeliveryCost(deliveryLocality.deliveryCost);
        } else {
            setTotal(res);
            setDeliveryCost(0);
        }
        setSubtotal(res);
    }, [cart, deliveryLocality]);

    return {
        subtotal,
        deliveryCost,
        total,
        setTotal,
    };
}
