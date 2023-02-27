import { ICategory } from './category';
import { IProduct } from './product';
import { SizeTranslations } from './size';

export type CartItem = Pick<IProduct, 'translations' | 'imageUrl'> & {
    quantity: number;
    price: number;
    metrics: SizeTranslations;
    category: ICategory;
    _id: string;
};

export interface ICart {
    items: CartItem[];
}
