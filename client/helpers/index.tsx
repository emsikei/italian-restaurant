import { v4 as uuidv4 } from 'uuid';
import { ICart } from '../types/cart';
import { ICategory } from '../types/category';
import { ILocality } from '../types/locality';

export const generateId = (): number => Math.floor(Math.random() * 10000000);

export const localStorageHasKey = (key: string): boolean => key in localStorage;

export const getItemFromLocalStorage = <T,>(key: string): T | undefined => {
    if (!localStorageHasKey(key)) {
        return undefined;
    }

    if (localStorage.getItem(key) === 'undefined') return undefined;

    return JSON.parse(localStorage.getItem(key) as string);
};

export const setItemLocalStorage = (key: string, item: unknown): void => {
    localStorage.setItem(key, JSON.stringify(item));
};

export const calculatePriceWithDiscount = (price: number, discount: number): number =>
    Math.ceil(price - (price * discount) / 100);

export const calculateTotal = (cart: ICart): number =>
    cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);

export const getDeliveryCostByLocality = (localityName: string, localities: ILocality[]): number | undefined => {
    const item = localities.find((l: ILocality) => l.name === localityName);
    return item?.deliveryCost;
};

export const copyObject = <T,>(object: T): T => JSON.parse(JSON.stringify(object));

type ProductType = 'pizza' | 'wine' | '';

export const checkForRequiredCategory = (slug: string) => {
    if (slug.split('-').length > 1 && slug.includes('pizza')) {
        return false;
    }

    if (slug.includes('wine') || slug.includes('champagne')) return false;

    return true;
};

export const isObjectEmpty = (obj: any) => Object.keys(obj).length === 0;

export const isCategoryEmpty = (category: ICategory): boolean =>
    category.translations.ro.name === '' &&
    category.translations.ru.name === '' &&
    category.translations.en.name === '';

export const generateUUID = (): string => uuidv4();
