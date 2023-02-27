import { CartItem } from '../types/cart';
import { OrderItem } from '../types/order';

export const mapCartItemsToOrderItems = (items: CartItem[]): OrderItem[] => {
    const arr: OrderItem[] = [];

    for (const item of items) {
        const i = {
            id: item._id,
            name: item.translations.ro.name,
            price: item.price,
            quantity: item.quantity,
            size: item.metrics.ro.value,
            category: item.category.translations.ro.name,
        };

        arr.push(i);
    }

    return arr;
};
