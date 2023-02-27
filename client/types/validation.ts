import { AuthLogin } from './auth';
import { ICategory } from './category';
import { ILocality } from './locality';
import { IOrder } from './order';
import { ISize } from './size';

export type CheckoutValidationErrors = Pick<IOrder, 'contact' | 'address'>;
export type CheckoutValidationReturn = { hasErrors: boolean; errors: CheckoutValidationErrors };

export type LoginValidationErrors = Pick<AuthLogin, 'email' | 'password'>;
export type LoginValidationReturn = { hasErrors: boolean; errors: LoginValidationErrors };

export type CategoryValidationErrors = Pick<ICategory, 'translations'>;
export type CategoryValidationReturn = { hasErrors: boolean; errors: CategoryValidationErrors };

export type SizeValidationErrors = Pick<ISize, 'translations'>;
export type SizeValidationReturn = { hasErrors: boolean; errors: SizeValidationErrors };

export type BannerValidationErrors = {
    banner: string;
};

export type BannerValidationReturn = { hasErrors: boolean; errors: BannerValidationErrors };

export type ProductValidationErrors = {
    translations: {
        ro: {
            name: string;
            description: string;
        };
        en: {
            name: string;
            description: string;
        };
        ru: {
            name: string;
            description: string;
        };
    };
    category: string;
    image: string;
    defaultPriceAndSize: string;
    pricesAndSizes: string;
};

export type ProductValidationReturn = { hasErrors: boolean; errors: ProductValidationErrors };

export type LocalityValidationErrors = Pick<ILocality, 'name'> & {
    deliveryCost: string;
};
export type LocalityValidationReturn = { hasErrors: boolean; errors: LocalityValidationErrors };
